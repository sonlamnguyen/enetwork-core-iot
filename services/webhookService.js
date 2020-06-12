const _ = require('lodash');
const EmqxHelper = require('../libs/emqxHelper');

const DeviceStatusService = require('../services/deviceStatusService');

const ReportRawDevice = require('../models/reportRawDeviceModel');

module.exports = {
    dinhKy(payload) {
        return new Promise(async function(resolve, reject) {
            try {
                const dataInsert = payload;
                delete dataInsert['maLenh'];
                await DeviceStatusService.processDeviceStatus(dataInsert);
                await ReportRawDevice.create(dataInsert);
                resolve(true);
            } catch(error) {
                resolve(false);
            }
        });
    },

    dieuKhien(payload) {
        return new Promise(async function(resolve, reject) {
            try {
                const request = await EmqxHelper.getCheckConnectionRequest(deviceId);
                const connection = await EmqxHelper.requestPromise(request);
                if (connection && (!_.isEmpty(connection.data))) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch(error) {
                console.log(error);
                resolve(false);
            }
        });
    },

    cauHinh(payload) {
        return new Promise(async function(resolve, reject) {
            try {
                const request = await EmqxHelper.getCheckConnectionRequest(deviceId);
                const connection = await EmqxHelper.requestPromise(request);
                if (connection && (!_.isEmpty(connection.data))) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch(error) {
                console.log(error);
                resolve(false);
            }
        });
    },

    update(payload) {
        return new Promise(async function(resolve, reject) {
            try {
                const request = await EmqxHelper.getCheckConnectionRequest(deviceId);
                const connection = await EmqxHelper.requestPromise(request);
                if (connection && (!_.isEmpty(connection.data))) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch(error) {
                console.log(error);
                resolve(false);
            }
        });
    },

    henGio(payload) {
        return new Promise(async function(resolve, reject) {
            try {
                const request = await EmqxHelper.getCheckConnectionRequest(deviceId);
                const connection = await EmqxHelper.requestPromise(request);
                if (connection && (!_.isEmpty(connection.data))) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch(error) {
                console.log(error);
                resolve(false);
            }
        });
    },
};
