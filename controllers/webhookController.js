
const command = require('../configs/command');
const base = require('./baseController');
const {EVENT} = require('../libs/emqxHelper');

const WebhookService = require('../services/webhookService');

module.exports = {
    async process_rule(req, res, next) {
        console.log('####################### Process Rule ######################');
        try {
            const body = req.body;
            console.logog(body);
            const event = (body && body['event']) ? body['event'] : null;
            if (event) {         
                if (EVENT.PUBLISH == event) {
                    const payload = JSON.parse(req.body['payload']);
                    if (payload && payload.maLenh) {
                        switch(payload.maLenh) {
                            case command.DINH_KY:
                                console.log('dinh ky');
                                await WebhookService.dinhKy(payload);
                                break;
                            case command.DIEU_KHIEN:
                                console.log('dieu khien');
                                await WebhookService.dieuKhien(payload);
                                break;
                            case command.CAU_HINH:
                                console.log('cau hinh');
                                await WebhookService.cauHinh(payload);
                                break;
                            case command.UPDATE:
                                console.log('update');
                                await WebhookService.update(payload);
                                break;
                            case command.HEN_GIO:
                                console.log('hen gio');
                                await WebhookService.henGio(payload);
                                break;
                            default:
                                console.log('not found command');
                        }
                    }
                } else if (EVENT.CONNECT == event) {
                    console.log('connection');
                } else if (EVENT.DISCONECT == event) {
                    console.log('disconnection');
                }
            }
            return res.status(200).send("ok");
        } catch (error) {
            return res.status(400).send("fail");
        }
    },
    async auth(req, res, next) {
        console.log('####################### Auth ######################');
        console.log(req.query);
        console.log(req.params);
        console.log(req.body);
        return res.status(200).json(true);
    },

    async auth_acl(req, res, next) {
        console.log('####################### Auth ACL ######################');
        console.log(req.body);
        console.log(req.params);
        return res.status(200).json(true);
    }
};