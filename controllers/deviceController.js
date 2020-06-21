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
            const dataInsert = req.body;
            dataInsert['inputs'] = await Utils.genSubDevices('input', dataInsert['inputs']);
            dataInsert['outputs']= await Utils.genSubDevices('output', dataInsert['outputs']);
            dataInsert['analogs'] = await Utils.genSubDevices('analog', dataInsert['analogs']);
            const {status, data, error} = await BaseController.addNotExist(Device, query, dataInsert);
            if (!status) {
                return Response.error(res, 500, error);
            } else {
                return Response.success(res, data);
            }
        } catch(error) {
            console.log(error);
            return Response.error(res, 500, error.message);
        }
    },

    async update(req, res) {
        try {
            const query  = {
                deviceId : req.params.id
            };
            const dataUpdate = req.body;
            const {status, data, error} = await BaseController.updateOne(Device, query, dataUpdate);
            if (!status) {
                return Response.error(res, 500, error);
            } else {
                return Response.success(res, data);
            }
        } catch(error) {
            return Response.error(res, 500, error);
        }
    },

    async delete(req, res) {
        try {
            const {status, data, error} = await BaseController.delete(Device, req.params.id);
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
