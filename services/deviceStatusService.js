const _ = require('lodash');
var Promise = require('promise');
const Utils = require('../libs/utils');
const { emitStatusSocketByDeviceId } = require('../libs/redisSocket');

const ThingService = require('./thingService');

const Device = require('../models/deviceModel');
const DeviceStatus = require('../models/deviceStatusModel');
const DeviceUser = require('../models/deviceUserModel');
const User = require('../models/userModel');


const processInputs = (deviceConfig, data) => {
    return new Promise(function (resolve, reject) {
        try {
            const statusInputs = [];
            const inputs = deviceConfig['inputs'];
            const statusBinArr1 = Utils.convertDecToBinArray(data['input1']);
            const statusBinArr2 = Utils.convertDecToBinArray(data['input2']);
            const statusBinArr3 = Utils.convertDecToBinArray(data['input3']);
            for (let input of inputs) {
                if (input && input['status']) {
                    let value;
                    const channelId = parseInt(input.channelId);
                    if (channelId <= 16) {
                        value = statusBinArr1[16 - channelId];
                    } else if ((channelId > 16) && (channelId <= 32)) {
                        value = statusBinArr2[32 - channelId];
                    } else if ((channelId > 32) && (channelId <= 48)) {
                        value = statusBinArr3[48 - channelId];
                    }
                    const statusInput = {
                        channelId: channelId,
                        value: parseInt(value)
                    };
                    statusInputs.push(statusInput);
                }
            }
            resolve(statusInputs);
        } catch (error) {
            resolve(false);
        }
    });
}

const processOutputs = (deviceConfig, data) => {
    return new Promise(async function (resolve, reject) {
        try {
            const statusOutputs = [];
            const outputs = deviceConfig['outputs'];
            const outputBinArr1 = Utils.convertDecToBinArray(data['output1']);
            const outputBinArr2 = Utils.convertDecToBinArray(data['output2']);
            const outputBinArr3 = Utils.convertDecToBinArray(data['output3']);
            const warningBinArr1 = Utils.convertDecToBinArray(data['warning1']);
            const warningBinArr2 = Utils.convertDecToBinArray(data['warning2']);
            const warningBinArr3 = Utils.convertDecToBinArray(data['warning3']);
            let warningTrigger = 0;
            for (let output of outputs) {
                if (output && output['status']) {
                    let value;
                    const channelId = parseInt(output.channelId);
                    // if warning = 1 => value = 2
                    // if warning = 0 => value = output
                    if (channelId <= 16) {
                        if (parseInt(warningBinArr1[16 - channelId]) === 1) {
                            value = 2;
                            warningTrigger = 2;
                        } else {
                            value = parseInt(outputBinArr1[16 - channelId]);
                        }

                    } else if ((channelId > 16) && (channelId <= 32)) {
                        if (parseInt(warningBinArr2[32 - channelId]) === 1) {
                            value = 2;
                            warningTrigger = 2;
                        } else {
                            value = parseInt(outputBinArr2[32 - channelId]);
                        }
                    } else if ((channelId > 32) && (channelId <= 48)) {
                        if (parseInt(warningBinArr3[48 - channelId]) === 1) {
                            value = 2;
                            warningTrigger = 2;
                        } else {
                            value = parseInt(outputBinArr3[48 - channelId]);
                        }
                    }
                    const statusOutput = {
                        channelId: channelId,
                        value: value
                    };
                    statusOutputs.push(statusOutput);
                }
            }
            await Device.updateOne({ deviceId: deviceConfig['deviceId'] }, { $set: { value: warningTrigger } });
            resolve(statusOutputs);
        } catch (error) {
            resolve(false);
        }
    });
}


const processAnalogs = (deviceConfig, data) => {
    return new Promise(function (resolve, reject) {
        try {
            const statusAnalogs = [];
            const analogs = deviceConfig['analogs'];
            for (let analog of analogs) {
                if (analog && analog['status']) {
                    const channelId = parseInt(analog.channelId);
                    const statusAnalog = {
                        channelId: channelId,
                        value: parseInt(data['backup' + channelId])
                    };
                    statusAnalogs.push(statusAnalog);
                }
            }
            resolve(statusAnalogs);
        } catch (error) {
            resolve(false);
        }
    });
}

const pushSmsWarning = async (deviceData, statusOutputs) => {
    try {
        // {
        //     "Phone_number":["số điện thoại 1","số điện thoại 2","số điện thoại 3","số điện thoại 4"],
        //     "Content":" ID : ms0020,Số lượng lỗi : 3 : Báo hết bồn NAOH, Báo hết bồn H2O2,Báo Hết Polymer"
        // }
        let content = 'ID : ' + deviceData.deviceId + ',';

        const dataOutput = _.merge(deviceData.outputs, statusOutputs);
        let numberError = 0;
        let contentError = '';
        for (let output of dataOutput) {
            if (output && output.value == 2) {
                numberError++;
                contentError += output.name + ',';
            }
        }
        content += 'Số lượng lỗi: ' + numberError + ' - ' + contentError;
        if ((deviceData.value == 0) && (numberError == 0)) {
            return true;
        } else if ((deviceData.value == 2) && (numberError == 0)) {
            content = 'ID : ' + deviceData.deviceId + ' - Đã hết lỗi';
        }
        const payload = {
            phone_number: deviceData.sdt ? deviceData.sdt : [],
            content: content
        };
        console.log('payload send sms=> ', payload);
        const { status, data, error } = await ThingService.sendSms(deviceData.deviceId, payload);
        if (status) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.processDeviceStatus = (data) => {
    return new Promise(async function (resolve, reject) {
        try {
            const deviceConfig = await Device.findOne({ deviceId: data['deviceId'] });
            if (!deviceConfig) {
                console.log('Device not Found')
                resolve(false);
            }

            const statusInputs = await processInputs(deviceConfig, data);
            const statusOutputs = await processOutputs(deviceConfig, data);
            const statusAnalogs = await processAnalogs(deviceConfig, data);

            if (!(statusInputs || statusOutputs || statusAnalogs)) {
                resolve(false);
            }
            const deviceStatusData = {
                deviceId: deviceConfig.deviceId,
                type: deviceConfig.type,
                inputs: statusInputs,
                outputs: statusOutputs,
                analogs: statusAnalogs,
                status: true
            };

            let deviceStatusInsert;
            let oldDeviceStatus = await DeviceStatus.findOne({ deviceId: deviceConfig.deviceId });
            const objectsEqual = (o1, o2) => JSON.stringify(o1) === JSON.stringify(o2);
            if (!oldDeviceStatus) {
                deviceStatusInsert = await DeviceStatus.create(deviceStatusData);
            } else {
                const isEqual = objectsEqual(oldDeviceStatus.outputs, statusOutputs);
                if(!isEqual) {
                    await pushSmsWarning(deviceConfig, statusOutputs);
                }
                const migrateData = _.merge(oldDeviceStatus, deviceStatusData);
                deviceStatusInsert = await migrateData.save();
            }

            deviceConfig.signal = parseInt(data['signal']);

            
            await deviceConfig.save();

            // await emitStatusSocketByDeviceId(deviceStatusData.deviceId, deviceStatusData);
            resolve(true);
        } catch (error) {
            reject(false);
        }

    });
}