const ObjectId = require('mongodb').ObjectId; 
const moment = require('moment');

const Response = require('../libs/response');
const Utils = require('../libs/utils');

const DeviceService = require('../services/deviceService');
const DeviceUserService = require('../services/deviceUserService');
const ReportService = require('../services/reportService');

const ReportDevice = require('../models/reportDeviceModel');


const Device = require('../models/deviceModel');
const User = require('../models/userModel'); 

const BaseController = require('./baseController');


module.exports = {
    async reportInput(req, res) {
        try {
            const deviceIds = await DeviceUserService.getDeviceIdsByUserId(req.user._id);
            if (req.user.role != 'admin') {
                req.query['deviceId'] = deviceIds;
            }
            const startTime = new Date(parseInt(req.query['startTime']));
            const endTime = new Date(parseInt(req.query['endTime']));
            const reportInputs = await ReportDevice.find({ 
                deviceId: req.query['deviceId'],
                created_at: { 
                    $gte: startTime,
                    $lte: endTime 
                } 
            }).select({ 
                deviceId: 1, 
                inputs: 1 ,
                created_at: 1,
                updated_at: 1
            });
            if(reportInputs && (reportInputs.length > 0)) {
                const reponse = await ReportService.processInputs(reportInputs, req.query['deviceId'], req.query['channelId']);
                return Response.success(res, reponse);
            } else {
                return Response.success(res, []);
            } 
        } catch(error) {
            console.log(error);
            return Response.error(res, 500, error);
        }
    },

    async reportOutput(req, res) {
        try {
            const deviceIds = await DeviceUserService.getDeviceIdsByUserId(req.user._id);
            if (req.user.role != 'admin') {
                req.query['deviceId'] = deviceIds;
            }
            const startTime = new Date(parseInt(req.query['startTime']));
            const endTime = new Date(parseInt(req.query['endTime']));
            const reportOutputs = await ReportDevice.find({ 
                deviceId: req.query['deviceId'],
                created_at: { 
                    $gte: startTime,
                    $lte: endTime 
                } 
            }).select({ 
                deviceId: 1, 
                outputs: 1 ,
                created_at: 1,
                updated_at: 1
            });
            if(reportOutputs && (reportOutputs.length > 0)) {
                const reponse = await ReportService.processOutputs(reportOutputs, req.query['deviceId'], req.query['channelId']);
                return Response.success(res, reponse);
            } else {
                return Response.success(res, []);
            } 
        } catch(error) {
            console.log(error);
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
