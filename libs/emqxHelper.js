var Promise = require('promise');
var request = require('request');
var serialize = require('serialize-javascript');

module.exports.getOptionRequest = async (client_id, topic, payload) => {
    return new Promise(function(resolve, reject) {
        let base_url = process.env.MQTT_BASE_URL;
        var url_api = base_url + 'mqtt/publish';
        var body = {
            topic: topic,
            payload: serialize(payload),
            qos: 0,
            retain: false,
            from_client_id: client_id
        };
        var options = {
            url: url_api,
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
