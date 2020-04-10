const {
    promisify
} = require('util');
const jwt = require('jsonwebtoken');
const Response = require('../libs/response');
const User = require('../models/userModel');
const AppError = require('../utils/appError');


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
            const {
                email,
                password
            } = req.body;
    
            // 1) check if email and password exist
            if (!email || !password) {
                return next(new AppError(404, 'fail', 'Please provide email or password'), req, res, next);
            }
    
            // 2) check if user exist and password is correct
            const user = await User.findOne({
                email
            }).select('+password');
    
            if (!user || !await user.correctPassword(password, user.password)) {
                return next(new AppError(401, 'fail', 'Email or Password is wrong'), req, res, next);
            }
    
            // 3) All correct, send jwt to client
            const token = createToken(user.id);
    
            // Remove the password from the output 
            user.password = undefined;
    
            res.status(200).json({
                status: 'success',
                token,
                data: {
                    user
                }
            });
    
        } catch (err) {
            next(err);
        }
    }, 

    async signup(req, res, next) {
        try {
            if (req.body.password !== req.body.confirmPassword) {
                return Response.error(res, 400, 'Password and confirm password not macthed!!!');
            } else {
                const user = await User.findOne({
                    username: req.body.username
                });
                if(user) {
                    return Response.error(res, 400, 'Username is exists');
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
                        role: req.body.role ? req.body.role : 1,
                        status: req.body['status'] ? req.body['status'] : true,
                    });
                    if(insertUser) {
                        return Response.success(res, insertUser, 201);
                    }
                }
            }
        } catch (error) {
            console.log(error);
			return Response.error(res, 500, 'Register is fail!!');
        }
    },
};
