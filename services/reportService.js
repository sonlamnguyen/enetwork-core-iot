const _ = require('lodash');
var momentTimezone = require('moment-timezone');

const ThingService = require('./thingService');

module.exports = {
    processInputs(data, deviceId, channelId) {
        return new Promise(async function(resolve, reject) {
            try {
                const response = {
                    deviceId: deviceId,
                    channelId: channelId,
                    type: 'input',
                    data: []
                };
                const data_reponse = [];
                const timezone = 'Asia/Ho_Chi_Minh';
                for(let reportDevice of data) {
                    const rawInputs = reportDevice['inputs'] ? reportDevice['inputs'] : [];
                    const inputs = _.map(rawInputs, function(o) {
                        if (o.channelId == channelId) return o;
                    });
                    const input = _.first(_.without(inputs, undefined));
                    if (input) {
                        const temp = {
                            minutes: Math.round(input.second / 60),
                            created_at: momentTimezone(reportDevice.created_at).tz(timezone).format(),
                            updated_at: momentTimezone(reportDevice.updated_at).tz(timezone).format(),
                        };
                        data_reponse.push(temp);
                    }
                }
                response.data = data_reponse;
                resolve(response);
            } catch(error) {
                console.log(error);
                resolve(false);
            }
        });
    },

    processOutputs(data, deviceId, channelId) {
        return new Promise(async function(resolve, reject) {
            try {
                const response = {
                    deviceId: deviceId,
                    channelId: channelId,
                    type: 'output',
                    data: []
                };
                const data_reponse = [];
                const timezone = 'Asia/Ho_Chi_Minh';
                for(let reportDevice of data) {
                    const rawOutputs = reportDevice['outputs'] ? reportDevice['outputs'] : [];
                    const outputs = _.map(rawOutputs, function(o) {
                        if (o.channelId == channelId) return o;
                    });
                    const output = _.first(_.without(outputs, undefined));
                    if (output) {
                        const temp = {
                            minutes: Math.round(output.second / 60),
                            created_at: momentTimezone(reportDevice.created_at).tz(timezone).format(),
                            updated_at: momentTimezone(reportDevice.updated_at).tz(timezone).format(),
                        };
                        data_reponse.push(temp);
                    }
                }
                response.data = data_reponse;
                resolve(response);
            } catch(error) {
                console.log(error);
                resolve(false);
            }
        });
    },
};
