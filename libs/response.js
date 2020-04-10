'use strict';
module.exports.success = (res, data, code) => {
    return res.status(code || 200).json({
        success: true,
        data: data
    });
};

module.exports.error = (res, code, message) => {
    return res.status(code).json({
        success: false,
        message: message
    });
};