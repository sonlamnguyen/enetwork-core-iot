
const base = require('./baseController');

module.exports = {
    process_rule: (req, res, next) => {
        console.log('####################### Process Rule ######################');
        // const payload = JSON.parse(req.body['payload']);
        console.log(req.body);
        // console.log(payload);
        // console.log(payload['ma_lenh']);
        return res.status(200).json({
            status: 'success',
            data: req.body
        });
    },
    auth: (req, res, next) => {
        console.log('####################### Auth ######################');
        console.log(req.query);
        console.log(req.params);
        return res.status(200).json(false);
    },
    auth_acl: (req, res, next) => {
        console.log('####################### Auth ACL ######################');
        console.log(req.body);
        console.log(req.params);
        return res.status(200).json(true);
    }
};