const Response = require('../libs/response');
const Utils = require('../libs/utils');
const EmqxHelper = require('../libs/emqxHelper');

const Device = require('../models/deviceModel');
const SubDevice = require('../models/subDeviceModel');

const BaseController = require('./baseController');


module.exports = {
    async control(req, res) {
        try {
            const request = await EmqxHelper.getOptionRequest(req.body.deviceId, req.body.topic, req.body.payload);
            const control = await EmqxHelper.requestPromise(request);
            return Response.success(res, control);
        } catch(error) {
            console.log(error);
            return Response.error(res, 500, error);
        }
    },

    async connection(req, res) {
        try {
            const request = await EmqxHelper.getOptionRequest(req.body.deviceId, req.body.topic, req.body.payload);
            const control = await EmqxHelper.requestPromise(request);
            return Response.success(res, control);
        } catch(error) {
            console.log(error);
            return Response.error(res, 500, error);
        }
    },
};
