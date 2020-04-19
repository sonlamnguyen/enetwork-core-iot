const _ = require('lodash');
const Response = require('../libs/response');
const EmqxHelper = require('../libs/emqxHelper');
const Device = require('../models/deviceModel');
const BaseController = require('../controllers/baseController');

module.exports = {
    control(deviceId, payload) {
        return new Promise(async function(resolve, reject) {
            try {
                const topic = deviceId + '/control';
                const request = await EmqxHelper.getControlRequest(deviceId, topic, payload);
                const control = await EmqxHelper.requestPromise(request);
                resolve({
                    status: true,
                    data: control
                });
            } catch(error) {
                console.log(error);
                resolve({
                    status: false,
                    error: error.message
                });
            }
        });
    },

    config(deviceId, payload) {
        return new Promise(async function(resolve, reject) {
            try {
                const topic = deviceId + '/config';
                const request = await EmqxHelper.getControlRequest(deviceId, topic, payload);
                const config = await EmqxHelper.requestPromise(request);
                resolve({
                    status: true,
                    data: config
                });
            } catch(error) {
                console.log(error);
                resolve({
                    status: false,
                    error: error.message
                });
            }
        });
    },

    connection(deviceId) {
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

    checkPermissionDevice(req) {
        return new Promise(async function(resolve, reject) {
            try {
                const query = {
                    deviceId: req.body.deviceId
                };
                const {status, data, error} = await BaseController.getOne(Device, query, req);
                if (status) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch(error) {
                console.log(error);
                resolve(false);
            }
        });
    }
};
