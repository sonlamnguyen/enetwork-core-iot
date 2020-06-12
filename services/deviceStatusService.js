var Promise = require('promise');
const Utils = require('../libs/utils');

const Device = require('../models/deviceModel');
const User = require('../models/userModel'); 


const processInputs = (deviceConfig, data) => {
    return new Promise(function(resolve, reject) {
        try {
            const statusInputs = [];
            const inputs = deviceConfig['inputs'];
            const statusBinArr1 = Utils.convertDecToBinArray(data['input1']);
            const statusBinArr2 = Utils.convertDecToBinArray(data['input2']);
            const statusBinArr3 = Utils.convertDecToBinArray(data['input3']);
            for(let input of inputs) {
                let status;
                const channelId = input.channelId;
                if (channelId <= 16) {
                    status = statusBinArr1[16 - channelId];
                } else if((channelId > 16) && (channelId <= 32)) {
                    status = statusBinArr2[32 - channelId];
                } else if((channelId > 32) && (channelId <= 48)) {
                    status = statusBinArr3[48 - channelId];
                }
                const statusInput = {
                    channelId: channelId,
                    status: status
                };
                statusInputs.push(statusInput);
            }
            resolve(statusInputs);
        } catch(error) {
            resolve(false);
        }
    });
}

const processOutputs = (deviceConfig, data) => {
    return new Promise(function(resolve, reject) {
        try {
            const statusOutputs = [];
            const outputs = deviceConfig['outputs'];
            const statusBinArr1 = Utils.convertDecToBinArray(data['output1']);
            const statusBinArr2 = Utils.convertDecToBinArray(data['output2']);
            const statusBinArr3 = Utils.convertDecToBinArray(data['output3']);
            for(let output of outputs) {
                let status;
                const channelId = output.channelId;
                if (channelId <= 16) {
                    status = statusBinArr1[16 - channelId];
                } else if((channelId > 16) && (channelId <= 32)) {
                    status = statusBinArr2[32 - channelId];
                } else if((channelId > 32) && (channelId <= 48)) {
                    status = statusBinArr3[48 - channelId];
                }
                const statusOutput = {
                    channelId: channelId,
                    status: status
                };
                statusOutputs.push(statusOutput);
            }
            resolve(statusOutputs);
        } catch(error) {
            resolve(false);
        }
    });
}

const processWarnings = () => {
    return new Promise(function(resolve, reject) {
        
    });
}

const processBackups = () => {
    return new Promise(function(resolve, reject) {
        
    });
}

module.exports.processDeviceStatus = (data) => {
    return new Promise(async function(resolve, reject) {
        try {
            const deviceConfig = await Device.findOne({deviceId: data['deviceId']});
            if (!deviceConfig) {
                console.log('Device not Found')
                resolve(false);
            }

            const statusInputs = await processInputs(deviceConfig, data);
            const statusOutputs = await processOutputs(deviceConfig, data);
            console.log(statusOutputs);
            resolve(true);

        } catch(error) {
            reject(false);
        }
        
    });
}