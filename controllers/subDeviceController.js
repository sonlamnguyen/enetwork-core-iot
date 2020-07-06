const _ = require('lodash');
const ObjectId = require('mongodb').ObjectId; 

const Response = require('../libs/response');
const Utils = require('../libs/utils');

const DeviceService = require('../services/deviceService');
const DeviceUserService = require('../services/deviceUserService');

const Device = require('../models/deviceModel');
const User = require('../models/userModel'); 

const BaseController = require('./baseController');


module.exports = {
    async list(req, res) {
        try {
            const deviceIds = await DeviceUserService.getDeviceIdsByUserId(req.user._id);
            if (req.user.role != 'admin') {
                req.query['deviceId'] = deviceIds;
            }
            const {status, data, error} = await BaseController.list(Device, req.query, req);
            if (!status) {
                return Response.error(res, 500, error);
            } else {
                const responseData = await DeviceService.processStatusDevices(data);
                return Response.success(res, responseData);
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
            const {status, data, error} = await BaseController.getOne(Device, query, req);
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

    async add(req, res) {
        try {
            const query = {
                deviceId: req.body.deviceId
            };
            const deviceData = await Device.findOne(query);
            if (!deviceData) {
                return Response.error(res, 404, 'Device NOT found!');
            }
            const dataInsert = req.body;
            const newDeviceData = await DeviceService.processAddSubDevice(deviceData, dataInsert);
            const migrateData =  _.merge(deviceData, newDeviceData);
            const dataSave = await migrateData.save();
            if (!dataSave) {
                return Response.error(res, 500, error);
            } else {
                return Response.success(res, dataSave);
            }
        } catch(error) {
            console.log(error);
            return Response.error(res, 500, error.message);
        }
    },

    async update(req, res) {
        try {
            const query = {
                deviceId: req.params.deviceId
            };
            const deviceData = await Device.findOne(query);
            if (!deviceData) {
                return Response.error(res, 404, 'Device NOT found!');
            }
            const newDeviceData = await DeviceService.processUpdateSubDevice(deviceData, req.body);
            const migrateData =  _.merge(deviceData, newDeviceData);
            const dataSave = await migrateData.save();
            if (!dataSave) {
                return Response.error(res, 500, error);
            } else {
                return Response.success(res, dataSave);
            }
        } catch(error) {
            return Response.error(res, 500, error);
        }
    },

    async delete(req, res) {
        try {
            const dataDelete = req.params;
            const query = {
                deviceId: dataDelete.deviceId
            };
            const deviceData = await Device.findOne(query);
            if (!deviceData) {
                return Response.error(res, 404, 'Device NOT found!');
            }
            const newDeviceData = await DeviceService.processRemoveSubDevice(deviceData, dataDelete);
            const migrateData =  _.merge(deviceData, newDeviceData);
            const dataSave = await migrateData.save();
            if (!dataSave) {
                return Response.error(res, 500, error);
            } else {
                return Response.success(res, dataSave);
            }
        } catch(error) {
            return Response.error(res, 500, error);
        }
    }
};
