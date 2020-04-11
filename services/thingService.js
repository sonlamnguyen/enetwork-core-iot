const _ = require('lodash');
const Response = require('../libs/response');
const EmqxHelper = require('../libs/emqxHelper');

module.exports = {
    control(deviceId, topic, payload) {
        return new Promise(async function(resolve, reject) {
            try {
                const request = await EmqxHelper.getControlRequest(deviceId, topic, payload);
                const control = await EmqxHelper.requestPromise(request);
                resolve({
                    status: true,
                    data: control
                });
            } catch(error) {
                console.log(error);
                resolve({
                    status: false,
                    error: error.message
                });
            }
        });
    },

    connection(deviceId) {
        return new Promise(async function(resolve, reject) {
            try {
                const request = await EmqxHelper.getCheckConnectionRequest(deviceId);
                const connection = await EmqxHelper.requestPromise(request);
                if (connection && (!_.isEmpty(connection.data))) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch(error) {
                console.log(error);
                resolve(false);
            }
        });
    },
};
