const { check, validationResult } = require('express-validator');
const Reponses = require('../libs/response');

module.exports.add = [
    check('userId')
        .optional()
        .isString()
        .withMessage('userId is not string'),
    check('deviceId')
        .isString()
        .withMessage('deviceId is not string'),
    check('name')
        .optional()
        .isString()
        .withMessage('name is not string'),
    check('type')
        .isNumeric()
        .withMessage('type is not number'),
    check('inputs')
        .isNumeric()
        .isLength({ max: 48 })
        .withMessage('inputs is not number'),
    check('outputs')
        .isNumeric()
        .isLength({ max: 48 })
        .withMessage('outputs is not number'),
    check('analogs')
        .isNumeric()
        .isLength({ max: 10 })
        .withMessage('analogs is not number'),
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
    check('userId')
        .optional()
        .isString()
        .withMessage('userId is not string'),
    check('deviceId')
        .isString()
        .withMessage('deviceId is not string'),
    check('name')
        .optional()
        .isString()
        .withMessage('name is not string'),
    check('type')
        .optional()
        .isNumeric()
        .withMessage('type is not number'),
    check('inputs')
        .optional()
        .isNumeric()
        .withMessage('inputs is not number'),
    check('outputs')
        .optional()
        .isNumeric()
        .withMessage('outputs is not number'),
    check('analogs')
        .optional()
        .isNumeric()
        .withMessage('analogs is not number'),
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