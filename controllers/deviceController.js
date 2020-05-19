const Response = require('../libs/response');
const Utils = require('../libs/utils');

const Device = require('../models/deviceModel');
const SubDevice = require('../models/subDeviceModel');
const User = require('../models/userModel'); 

const BaseController = require('./baseController');


module.exports = {
    async list(req, res) {
        try {
            console.log(req.user);
            const {status, data, error} = await BaseController.list(Device, req.query, req);
            if (!status) {
                return Response.error(res, 500, error);
            } else {
                return Response.success(res, data);
            }
        } catch(error) {
            return Response.error(res, 500, error);
        }
    },

    async getById(req, res) {
        try {
            const {status, data, error} = await BaseController.getById(Device, req.params.id);
            if (!status) {
                return Response.error(res, 500, error);
            } else {
                return Response.success(res, data);
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
            if(!req.body['userId']) {
                req.body['userId'] = req.user._id;
            }
            const {status, data, error} = await BaseController.addNotExist(Device, query, req.body);
            if (!status) {
                return Response.error(res, 500, error);
            } else {
                const result = await Utils.generateSubDevice(data);
                if (result.status) {
                    const resultSubDevices = await BaseController.addMany(SubDevice, result.subDevices);
                    if (resultSubDevices.status) {
                        return Response.success(res, data);
                    } else {
                        return Response.error(res, 500, resultSubDevices.error);
                    }
                } else {
                    return Response.error(res, 500, result.error);
                }  
            }
        } catch(error) {
            return Response.error(res, 500, error);
        }
    },

    async update(req, res) {
        try {
            const query  = {
                '_id' : req.params.id
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
