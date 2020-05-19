
const command = require('../configs/command');
const base = require('./baseController');
const {EVENT} = require('../libs/emqxHelper');

const WebhookEventService = require('../services/webhookEventService');
const WebhookService = require('../services/webhookService');

module.exports = {
    async process_rule(req, res, next) {
        console.log('####################### Process Rule ######################');
        try {
            const body = req.body;
            console.log(body);
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
                } else if (EVENT.SUBSCRIBE == event) {
                    console.log('subscribe');
                } else if (EVENT.CONNECT == event) {
                    console.log('connection');
                    await WebhookEventService.statusDevice(body['client_id'], true);
                } else if (EVENT.DISCONECT == event) {
                    console.log('disconnection');
                    await WebhookEventService.statusDevice(body['client_id'], false);
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
        const dataAuth = req.query;
        if (dataAuth && (dataAuth['username'] == dataAuth['clientid']) && (dataAuth['password'] === '123456')) {
            const checkDevice = await WebhookEventService.checkDeviceExist(dataAuth['clientid']);
            if (!checkDevice) {
                return res.status(400).send(false);
            } else {
                return res.status(200).send(true);
            }
        } else {
            return res.status(400).send(false);
        }
    },

    async auth_acl(req, res, next) {
        console.log('####################### Auth ACL ######################');
        console.log(req.query);
        const dataAuth = req.query;
        if (process.env.ALLOW_SUBSCRIBE_ALL == 'false') {
            const topic = dataAuth['topic'];
            const clientId = dataAuth['clientid'];
            if (!topic.includes(clientId)) {
                return res.status(400).send(false);
            }
        }
        if (dataAuth && (dataAuth['username'] == dataAuth['clientid'])) {
            return res.status(200).send(true);
        } else {
            return res.status(400).send(false);
        }
    }
};