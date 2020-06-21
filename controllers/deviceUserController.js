const ObjectId = require('mongodb').ObjectId; 

const Response = require('../libs/response');
const Utils = require('../libs/utils');

const DeviceService = require('../services/deviceService');

const DeviceUser = require('../models/deviceUserModel');

const Device = require('../models/deviceModel');
const User = require('../models/userModel'); 

const BaseController = require('./baseController');


module.exports = {
    async list(req, res) {
        try {
            const {status, data, error} = await BaseController.list(DeviceUser, req.query, req);
            if (!status) {
                return Response.error(res, 500, error);
            } else {
                console.log(data);
                return Response.success(res, data);
            }
        } catch(error) {
            return Response.error(res, 500, error);
        }
    },

    async getById(req, res) {
        try {
            const query = {
                deviceId: req.params.id
            };
            const {status, data, error} = await BaseController.getOne(DeviceUser, query, req);
            if (!status) {
                return Response.error(res, 500, error);
            } else {
                const responseData = await DeviceService.processStatusDevice(data);
                return Response.success(res, responseData);
            }
        } catch(error) {
            return Response.error(res, 500, error);
        }
    },

    async insertOrUpdate(req, res) {
        try {
            const dataBody = req.body;
            const query = {
                deviceId : dataBody.deviceId
            };
            const device = await Device.findOne(query);
            if(!device) {
                return Response.error(res, 500, 'Device is NOT found!!!');
            }
            const oldDeviceUser = await DeviceUser.findOne({
                deviceId : dataBody.deviceId
            });
            if (oldDeviceUser) {
                oldDeviceUser.userIds = dataBody.userIds;
                const dataSave = await oldDeviceUser.save();
                if (!dataSave) {
                    return Response.error(res, 500, 'Update device user is fail!!!');
                } else {
                    return Response.success(res, dataSave);
                }
            } else {
                const data = await DeviceUser.create(dataBody);
                if (data && (data.length < 1)) {
                    return Response.error(res, 500, 'Add device user is fail!!!');
                } else {
                    return Response.success(res, data);
                }
            }
        } catch(error) {
            return Response.error(res, 500, error);
        }
    },

    async delete(req, res) {
        try {
            const {status, data, error} = await BaseController.delete(DeviceUser, req.params.id);
            if (!status) {
                return Response.error(res, 500, error);
            } else {
                return Response.success(res, 'Delete success');
            }
        } catch(error) {
            return Response.error(res, 500, error);
        }
    }
};
