const Response = require('../libs/response');

const User = require('../models/userModel');

const BaseController = require('./baseController');


module.exports = {
    async list(req, res) {
        try {
            console.log(req.query);
            const {status, data, error} = await BaseController.list(User, req.query, req);
            console.log(data);
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
        console.log(req.params.id);
        try {
            const {status, data, error} = await BaseController.getById(User, req.params.id);
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
        console.log(req.body);
        try {
            if (req.body.password !== req.body.confirmPassword) {
                return Response.error(res, 400, 'Password and confirm password not macthed!!!');
            } else {
                const query = {
                    $or: [{
                        userName: req.body.userName
                    }, {
                        email: req.body.email
                    }]
                };
                const {status, data, error} = await BaseController.addNotExist(User, query, req.body);
                console.log(error);
                if (!status) {
                    return Response.error(res, 500, error);
                } else {
                    return Response.success(res, data);
                }
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
            console.log(query);
            console.log(req.body);
            const dataUpdate = req.body;
            delete dataUpdate['userName'];
            delete dataUpdate['email'];
            delete dataUpdate['password'];
            const {status, data, error} = await BaseController.updateOne(User, query, dataUpdate);
            console.log(data);
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
        console.log(req.params);
        try {
            const {status, data, error} = await BaseController.delete(User, req.params.id);
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
