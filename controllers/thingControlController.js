const _ = require('lodash');
const Response = require('../libs/response');
const Utils = require('../libs/utils');
const EmqxHelper = require('../libs/emqxHelper');
const {emitStatusSocket} = require('../libs/redisSocket');

const ThingService = require('../services/thingService');

const Device = require('../models/deviceModel');

const BaseController = require('./baseController');


module.exports = {
    async control(req, res) {
        try {
            const device = await ThingService.checkPermissionDevice(req);
            if (!device) {
                return Response.error(res, 500, "Device not found!!");
            }

            const {status, data, error} = await ThingService.control(req.body.deviceId, req.body.payload);
            if (status) {
                return Response.success(res, data);
            } else {
                return Response.error(res, 500, error);
            }
        } catch(error) {
            console.log(error);
            return Response.error(res, 500, error);
        }
    },

    async config(req, res) {
        try {
            const device = await ThingService.checkPermissionDevice(req);
            if (!device) {
                return Response.error(res, 500, "Device not found!!");
            }
            const {status, data, error} = await ThingService.config(req.body.deviceId, req.body.payload);
            console.log(data);
            if (status) {
                return Response.success(res, data);
            } else {
                return Response.error(res, 500, error);
            }
        } catch(error) {
            console.log(error);
            return Response.error(res, 500, error);
        }
    },

    async connection(req, res) {
        try {
            const isConnection = await ThingService.connection(req.params.deviceId);
            console.log(isConnection);
            if (isConnection) {
                return Response.success(res, {
                    [req.params.deviceId] : true
                });
            } else {
                return Response.success(res, {
                    [req.params.deviceId] : false
                });
            }
        } catch(error) {
            return Response.success(res, {
                [req.params.deviceId] : false
            });
        }
    },
};
