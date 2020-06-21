const { check, validationResult } = require('express-validator');
const Reponses = require('../libs/response');

module.exports.add = [
    check('name')
        .isString()
        .withMessage('name is not string'),
    check('code')
        .isString()
        .withMessage('code is not string'),
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
    check('name')
        .optional()
        .isString()
        .withMessage('name is not string'),
    check('code')
        .optional()
        .isString()
        .withMessage('code is not string'),
    check('status')
        .optional()
        .isBoolean()
        .withMessage('status is missing or invalid format'),
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors);
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
        console.log(errors);
        if (!errors.isEmpty()) {
            return Reponses.error(res, 401, errors.array()[0]['msg']);
        }
        next();
    }
];