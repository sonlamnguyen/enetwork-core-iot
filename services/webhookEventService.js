const _ = require('lodash');
const EmqxHelper = require('../libs/emqxHelper');
const Device = require('../models/deviceModel');
const LogStatusDevice = require('../models/logStatusDevice');

const {emitStatusSocket} = require('../libs/redisSocket');

module.exports = {
    statusDevice(clientId, status) {
        return new Promise(async function(resolve, reject) {
            try {
                const deviceData = await Device.findOne({deviceId: clientId});
                if (!deviceData) {
                    resolve(false);
                } else {
                    const userId = deviceData['userId'];
                    const data  = {
                        [clientId] : status
                    };
                    emitStatusSocket(userId, data);
                    await LogStatusDevice.create({
                        deviceId: clientId,
                        status: status
                    });
                    resolve(true);
                }
            } catch(error) {
                resolve(false);
            }
        });
    },

    checkDeviceExist(clientId) {
        return new Promise(async function(resolve, reject) {
            try {
                const deviceData = await Device.findOne({deviceId: clientId});
                if (!deviceData) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            } catch(error) {
                resolve(false);
            }
        });
    }
};
