const _ = require('lodash');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');

const Utils = require('../libs/utils');
const Response = require('../libs/response');
const User = require('../models/userModel');
const Roles = require('../models/roleModel');


const createToken = id => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

module.exports = {
    async login(req, res, next) {
        try {
            const user = await User.findOne({
                $or: [{
                    userName: req.body.author
                }, {
                    email: req.body.author
                }]
            }).select('+password');

            if (!user || !await user.correctPassword(req.body.password, user.password)) {
                return Response.error(res, 400, 'Email or Password is wrong'); 
            }
    
            // 3) All correct, send jwt to client
            const token = createToken(user.id);
    
            // Remove the password from the output 
            user.password = undefined;
    
            return Response.success(res, {
                token: 'Bearer ' + token,
                userId: user.id
            });
        } catch (err) {
            console.log(err);
            return Response.error(res, 500, 'Signup have a problem. Please, try again!');
        }
    }, 

    async signup(req, res, next) {
        try {
            if (req.body.password !== req.body.confirmPassword) {
                return Response.error(res, 400, 'Password and confirm password not macthed!!!');
            } else {
                const user = await User.findOne({
                    $or: [{
                        userName: req.body.userName
                    }, {
                        email: req.body.email
                    }]
                });
                if(user) {
                    return Response.error(res, 400, 'Username or Email are exists');
                } else {
                    const insertUser = await User.create({
                        firstName: req.body['firstName'] ? req.body['firstName'] : '',
                        lastName: req.body['lastName'] ? req.body['lastName'] : '',
                        userName: req.body.userName,
                        email: req.body.email,
                        company: req.body['company'] ? req.body['company'] : '',
                        address: req.body['address'] ? req.body['address'] : '',
                        phone: req.body['phone'] ? req.body['phone'] : '',
                        avatar: req.body['avatar'] ? req.body['avatar'] : '',
                        password: req.body.password,
                        role: req.body.role ? req.body.role : '',
                        status: req.body['status'] ? req.body['status'] : true,
                    });
                    if(insertUser) {
                        return Response.success(res, insertUser, 201);
                    } else {
                        return Response.error(res, 500, 'Register is fail!!');
                    }
                }
            }
        } catch (error) {
            console.log(error);
			return Response.error(res, 500, 'Register is fail!!');
        }
    },
    
    async authenticaion(req, res, next) {
        try {
            // 1) check if the token is there
            let token;
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1];
            }

            // console.log(token);
            if (!token) {
                return Response.error(res, 500, 'You are not logged in! Please login in to continue');
            }
    
            // 2) Verify token 
            const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    
            // 3) check if the user is exist (not deleted)
            const user = await User.findById(decode.id);
            if (!user) {
                return Response.error(res, 500, 'This user is no longer exist');
            }
            req.user = user;
            next();
        } catch (err) {
            console.log(err);
            return Response.error(res, 500, 'Please login before call API');
        }
    },

    async checkPermission(req, res, next) {
        try {
            const role = await Roles.findOne({
                code: req.user.role
            });
            if(role) {
                let path = req.baseUrl;
                console.log(path);
                path = path.replace(process.env.BASE_URL_API, '');
                if(req.path.replace('/', '')) {
                    path = path + '/:id';
                }
                let pers = _.includes(role.permissions[req.method], path);
                if(role.permissions && pers) {
                    return next();
                } else {
                    return Response.error(res, 403, 'Unauthorized access');
                }
            } else {
                return Response.error(res, 403, 'Unauthorized access');
            }
        } catch(error) {
            return Response.error(res, 403, 'Unauthorized access');
        }
    }
};
