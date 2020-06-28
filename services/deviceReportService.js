const _ = require('lodash');
const moment = require('moment');
var Promise = require('promise');
const Utils = require('../libs/utils');
const {emitStatusSocketByDeviceId} = require('../libs/redisSocket');

const Device = require('../models/deviceModel');
const DeviceStatus = require('../models/deviceStatusModel');
const DeviceReport = require('../models/reportDeviceModel');


const processInputs = (deviceConfig, data, dataReportDevice = null) => {
    return new Promise(async function(resolve, reject) {
        try {
            const reportInputs = [];
            const oldReportInputs = (dataReportDevice && dataReportDevice['inputs']) ? dataReportDevice['inputs'] : [];
            const inputs = deviceConfig['inputs'];
            const statusBinArr1 = Utils.convertDecToBinArray(data['input1']);
            const statusBinArr2 = Utils.convertDecToBinArray(data['input2']);
            const statusBinArr3 = Utils.convertDecToBinArray(data['input3']);
            for(let input of inputs) {
                let value = 0;
                let channelId = parseInt(input.channelId);
                const oldInputs = _.map(oldReportInputs, function(o) {
                    if (o.channelId === channelId) return o;
                });
                const oldInput = _.first(_.without(oldInputs, undefined));
                if (channelId <= 16) {
                    value = statusBinArr1[16 - channelId];
                } else if((channelId > 16) && (channelId <= 32)) {
                    value = statusBinArr2[32 - channelId];
                } else if((channelId > 32) && (channelId <= 48)) {
                    value = statusBinArr3[48 - channelId];
                }

                let reportInput = {
                    type: 'input',
                    channelId: channelId, 
                    value: parseInt(value),
                    minute: 0,
                    second: 0,
                    status: '1'
                };
                let oldUpdate = moment().startOf('hour');
                if (oldInput) {
                    oldUpdate = dataReportDevice.updated_at ? dataReportDevice.updated_at : dataReportDevice.created_at;
                    reportInput = oldInput;
                    reportInput.value = parseInt(value);
                }

                if (reportInput.value) {
                    reportInput.second = reportInput.second + Utils.getDiffTimeSeconds(oldUpdate, moment());
                }
                reportInputs.push(reportInput);
            }
            resolve(reportInputs);
        } catch(error) {
            console.log(error);
            resolve(false);
        }
    });
}

const processOutputs = (deviceConfig, data, dataReportDevice = null) => {
    return new Promise(function(resolve, reject) {
        try {
            const reportOutputs = [];
            const oldReportOutputs = (dataReportDevice && dataReportDevice['outputs']) ? dataReportDevice['outputs'] : [];
            const outputs = deviceConfig['outputs'];
            const outputBinArr1 = Utils.convertDecToBinArray(data['output1']);
            const outputBinArr2 = Utils.convertDecToBinArray(data['output2']);
            const outputBinArr3 = Utils.convertDecToBinArray(data['output3']);
            const warningBinArr1 = Utils.convertDecToBinArray(data['warning1']);
            const warningBinArr2 = Utils.convertDecToBinArray(data['warning2']);
            const warningBinArr3 = Utils.convertDecToBinArray(data['warning3']);
            for(let output of outputs) {
                let value;
                const channelId = parseInt(output.channelId);
                const oldOutputs = _.map(oldReportOutputs, function(o) {
                    if (o.channelId === channelId) return o;
                });
                const oldOutput = _.first(_.without(oldOutputs, undefined));
                // if warning = 1 => value = 2
                // if warning = 0 => value = output
                if (channelId <= 16) {
                    if (parseInt(warningBinArr1[16 - channelId]) === 1) {
                        value = 2;
                    } else {
                        value = parseInt(outputBinArr1[16 - channelId]);
                    }
                    
                } else if((channelId > 16) && (channelId <= 32)) {
                    if (parseInt(warningBinArr2[32 - channelId]) === 1) {
                        value = 2;
                    } else {
                        value = parseInt(outputBinArr2[32 - channelId]);
                    }
                } else if((channelId > 32) && (channelId <= 48)) {
                    if (parseInt(warningBinArr3[48 - channelId]) === 1) {
                        value = 2;
                    } else {
                        value = parseInt(outputBinArr3[48 - channelId]);
                    }
                }
                let reportOutput = {
                    type: 'output',
                    channelId: channelId, 
                    value: parseInt(value),
                    minute: 0,
                    second: 0,
                    status: '1'
                };
                let oldUpdate = moment().startOf('hour');
                if (oldOutput) {
                    oldUpdate = dataReportDevice.updated_at ? dataReportDevice.updated_at : dataReportDevice.created_at;
                    reportOutput = oldOutput;
                    reportOutput.value = parseInt(value);
                }

                if (reportOutput.value === 1) {
                    reportOutput.second = reportOutput.second + Utils.getDiffTimeSeconds(oldUpdate, moment());
                }
                reportOutputs.push(reportOutput);
            }
            resolve(reportOutputs);
        } catch(error) {
            console.log(error);
            resolve(false);
        }
    });
}


const processAnalogs = (deviceConfig, data, dataReportDevice = null) => {
    return new Promise(function(resolve, reject) {
        try {
            const reportAnalogs = [];
            const analogs = deviceConfig['analogs'];
            for(let analog of analogs) {
                const channelId = parseInt(analog.channelId);
                const statusAnalog = {
                    channelId: channelId,
                    value: parseInt(data['backup' + channelId])
                };
                statusAnalogs.push(statusAnalog);
            }
            resolve(statusAnalogs);
        } catch(error) {
            resolve(false);
        }
    });
}

module.exports.processDeviceReport = (data) => {
    return new Promise(async function(resolve, reject) {
        try {
            const deviceConfig = await Device.findOne({deviceId: data['deviceId']});
            if (!deviceConfig) {
                console.log('Device not Found')
                resolve(false);
            }
            const beginHoursTime = moment().startOf('hour');
            const endHoursTime = moment().endOf('hour');
            const deviceReportOld = await DeviceReport.findOne({
                deviceId: data['deviceId'],
                created_at: {
                    $gte: beginHoursTime,
                    $lte: endHoursTime
                }
            });
            
            if (deviceReportOld) {
                deviceReportOld.inputs = await processInputs(deviceConfig, data, deviceReportOld);
                deviceReportOld.output = await processOutputs(deviceConfig, data, deviceReportOld);
                await deviceReportOld.save();
            } else {
                const reportInputs = await processInputs(deviceConfig, data);
                const reportOutputs = await processOutputs(deviceConfig, data);
                const newReportDevice = {
                    deviceId: data['deviceId'],
                    inputs: reportInputs,
                    outputs: reportOutputs,
                    analogs: [],
                };

                await DeviceReport.create(newReportDevice);
            }
            resolve(true);
        } catch(error) {
            reject(false);
        }
        
    });
}