const { check, validationResult } = require('express-validator');
const Reponses = require('../libs/response');


module.exports.reportInput = [
    check('startTime')
        .isNumeric()
        .withMessage('startTime is not number'),
    check('endTime')
        .isNumeric()
        .withMessage('endTime is not number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return Reponses.error(res, 401, errors.array()[0]['msg']);
        }
        next();
    }
];