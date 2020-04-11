
const command = require('../configs/command');
const base = require('./baseController');


module.exports = {
    process_rule: (req, res, next) => {
        console.log('####################### Process Rule ######################');
        try {
            const payload = JSON.parse(req.body['payload']);
            if (payload && payload.ma_lenh) {
                switch(payload.ma_lenh) {
                    case command.DINH_KY:
                        console.log('dinh ky');
                        break;
                    case command.DIEU_KHIEN:
                        console.log('dieu khien');
                        break;
                    case command.CAU_HINH:
                        console.log('cau hinh');
                        break;
                    case command.UPDATE:
                        console.log('update');
                        break;
                    case command.HEN_GIO:
                        console.log('hen gio');
                        break;
                    default:
                        console.log('not found command');
                }
            }
            return res.status(200);
        } catch (error) {
            return res.status(400);
        }
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