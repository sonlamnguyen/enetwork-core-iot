const { check, validationResult } = require('express-validator');
const Reponses = require('../libs/response');

module.exports.add = [
    check('userId')
        .isString()
        .withMessage('userId is not string'),
    check('deviceId')
        .isString()
        .withMessage('deviceId is not string'),
    check('channelId')
        .isNumeric()
        .withMessage('channelId is not number'),
    check('name')
        .optional()
        .isString()
        .withMessage('name is not string'),
    check('type')
        .isString()
        .withMessage('type is not string'),
    check('flows')
        .optional()
        .isString()
        .withMessage('inputs is not string'),
    check('capacity')
        .optional()
        .isString()
        .withMessage('inputs is not string'),
    check('status')
        .isBoolean()
        .withMessage('status is missing or invalid format'),
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
    check('deviceId')
        .isString()
        .withMessage('deviceId is not string'),
    check('channelId')
        .isNumeric()
        .withMessage('channelId is not number'),
    check('name')
        .optional()
        .isString()
        .withMessage('name is not string'),
    check('type')
        .optional()
        .isString()
        .withMessage('type is not string'),
    check('flows')
        .optional()
        .isString()
        .withMessage('inputs is not string'),
    check('capacity')
        .optional()
        .isString()
        .withMessage('inputs is not string'),
    check('status')
        .optional()
        .isBoolean()
        .withMessage('status is missing or invalid format'),
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