const Response = require('../libs/response');

const Permissions = require('../models/permissionModel');

const BaseController = require('./baseController');


module.exports = {
    async list(req, res) {
        try {
            const {status, data, error} = await BaseController.list(Permissions, req.query, req);
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
            const {status, data, error} = await BaseController.getById(Permissions, req.params.id);
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
            const dataInsert = req.body;
            const {status, data, error} = await BaseController.addNotExist(Roles, {name: dataInsert.name}, dataInsert);
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

    async update(req, res) {
        try {
            const query  = {
                '_id' : req.params.id
            };
            const dataUpdate = req.body;
            const {status, data, error} = await BaseController.updateOne(Permissions, query, dataUpdate);
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
    async delete(req, res) {
        try {
            const {status, data, error} = await BaseController.delete(Permissions, req.params.id);
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
