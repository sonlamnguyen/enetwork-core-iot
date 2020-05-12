var Promise = require('promise');
var request = require('request');
var serialize = require('serialize-javascript');


module.exports.EVENT = {
    CONNECT: 'client.connected',
    DISCONECT: 'client.disconnected',
    PUBLISH: 'message.publish'
};

module.exports.getControlRequest = async (clientId, topic, payload) => {
    return new Promise(function(resolve, reject) {
        let baseUrl = process.env.MQTT_BASE_URL;
        var urlApi = baseUrl + '/mqtt/publish';
        var body = {
            topic: topic,
            payload: serialize(payload),
            qos: 0,
            retain: false,
            from_client_id: clientId
        };
        var options = {
            url: urlApi,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username: process.env.MQTT_USER,
                password: process.env.MQTT_PASS
            },
            body: body,
            json: true
        };
        resolve(options);
    });
}

module.exports.getCheckConnectionRequest = async (clientId) => {
    return new Promise(function(resolve, reject) {
        let baseUrl = process.env.MQTT_BASE_URL;
        var urlApi = baseUrl + '/connections/' + clientId;
        var options = {
            url: urlApi,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username: process.env.MQTT_USER,
                password: process.env.MQTT_PASS
            },
            body: {},
            json: true
        };
        resolve(options);
    });
}

module.exports.requestPromise = (options) => {
    return new Promise(function(resolve, reject) {
        request(options, function(err, res, body) {
            if (err) {
                reject(err);
            }
            resolve(body);
        });
    });
}
