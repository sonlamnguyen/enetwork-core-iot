const { check, validationResult } = require('express-validator');
const Reponses = require('../libs/response');

module.exports.add = [
    check('userName')
        .isString()
        .withMessage('userName is not string'),
    check('firstName')
        .optional()
        .isString()
        .withMessage('firstName is not string'),
    check('lastName')
        .optional()
        .isString()
        .withMessage('lastName is not string'),
    check('address')
        .optional()
        .isString()
        .withMessage('address is not string'),
    check('company')
        .optional()
        .isString()
        .withMessage('company is not string'),
    check('phone')
        .optional()
        .isString()
        .withMessage('Phone is not string'),
    check('email')
        .isEmail()
        .withMessage('Email invalid format'),
    check('avatar')
        .optional()
        .isURL({
            protocols: ['https'],
            require_protocol: true
        })
        .withMessage('Avatar invalid format'),
    check('role')
        .isString()
        .withMessage('Role is not string'), 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return Reponses.error(res, 401, errors.array()[0]['msg']);
        }
        next();
    }
];

module.exports.list = [
    check('page')
        .isNumeric()
        .withMessage('page is not number'),
    check('pageSize')
        .isNumeric()
        .withMessage('pageSize is not number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return Reponses.error(res, 401, errors.array()[0]['msg']);
        }
        next();
    }
];


module.exports.getById = [
    check('id')
        .isString()
        .withMessage('Id is not string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return Reponses.error(res, 401, errors.array()[0]['msg']);
        }
        next();
    }
];


module.exports.update = [
    check('userName')
        .optional()
        .isString()
        .withMessage('userName is not string'),
    check('firstName')
        .optional()
        .isString()
        .withMessage('firstName is not string'),
    check('lastName')
        .optional()
        .isString()
        .withMessage('lastName is not string'),
    check('address')
        .optional()
        .isString()
        .withMessage('address is not string'),
    check('company')
        .optional()
        .isString()
        .withMessage('company is not string'),
    check('phone')
        .optional()
        .isString()
        .withMessage('Phone is not string'),
    check('email')
        .optional()
        .isEmail()
        .withMessage('Email invalid format'),
    check('avatar')
        .optional()
        .isURL({
            protocols: ['https'],
            require_protocol: true
        })
        .withMessage('Avatar invalid format'),
    check('role')
        .optional()
        .isString()
        .withMessage('Role is not string'), 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return Reponses.error(res, 401, errors.array()[0]['msg']);
        }
        next();
    }
];

module.exports.delete = [
    check('id')
        .isString()
        .withMessage('Id is not string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return Reponses.error(res, 401, errors.array()[0]['msg']);
        }
        next();
    }
];