const _ = require('lodash');
const EmqxHelper = require('../libs/emqxHelper');
const Device = require('../models/deviceModel');

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
                        clientId : status
                    };
                    emitStatusSocket(userId, data);
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
