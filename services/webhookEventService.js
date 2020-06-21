const _ = require('lodash');
const EmqxHelper = require('../libs/emqxHelper');
const LogStatusDevice = require('../models/logStatusDevice');
const Device = require('../models/deviceModel');

const BaseController = require('../controllers/baseController');

const {emitStatusSocketByDeviceId} = require('../libs/redisSocket');

module.exports = {
    statusDevice(clientId, status) {
        return new Promise(async function(resolve, reject) {
            try {
                const deviceData = await Device.findOne({deviceId: clientId});
                if (!deviceData) {
                    resolve(false);
                } else {
                    await BaseController.updateOne(Device, {deviceId: clientId}, {status: status});
                    const dataSocket = {
                        deviceId: clientId,
                        status: status
                    };
                    emitStatusSocketByDeviceId(dataSocket.deviceId, dataSocket);
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
