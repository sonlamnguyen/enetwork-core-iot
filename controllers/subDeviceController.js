const Response = require('../libs/response');
const Utils = require('../libs/utils');

const Device = require('../models/deviceModel');
const SubDevice = require('../models/subDeviceModel');

const BaseController = require('./baseController');


module.exports = {
    async list(req, res) {
        try {
            let query = req.query;
            const {status, data, error} = await BaseController.list(SubDevice, query, req);
            if (!status) {
                return Response.error(res, 500, error);
            } else {
                return Response.success(res, data);
            }
        } catch(error) {
            console.log(error);
            return Response.error(res, 500, error);
        }
    },

    async getById(req, res) {
        try {
            let query = {
                _id: req.params.id
            };
            query = Utils.getQueryAuthen(req, query);
            const {status, data, error} = await BaseController.getOne(SubDevice, query, req);
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
                deviceId: req.body.deviceId,
                channelId: req.body.channelId
            };
            const {status, data, error} = await BaseController.addNotExist(SubDevice, query, req.body);
            if (!status) {
                return Response.error(res, 500, error);
            } else {
                return Response.success(res, data);
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
