const { check, validationResult } = require('express-validator');
const Reponses = require('../libs/response');

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


