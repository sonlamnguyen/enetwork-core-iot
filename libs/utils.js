'use strict';
const Promise = require('promise');


module.exports.getQueryAuthen = (req, query) => {
    if (req.user.role != 'admin') {
        query['userId'] = req.user._id;
    }
    return query;
};

module.exports.generateSubDevice = (device) => {
    return new Promise(async function(resolve, reject) {
        try {
            const subDevices = [];
            for (let input = 1; input <= parseInt(device['inputs']); input++) {
                const subDevice = {
                    userId: device['userId'],
                    deviceId: device['deviceId'],
                    channelId: input,
                    name: 'input_device_' + input,
                    type: 'input',
                    flows: '',
                    capacity: '',
                    status: true
                };
                subDevices.push(subDevice);
            }

            for (let output = 1; output <= parseInt(device['outputs']); output++) {
                const subDevice = {
                    userId: device['userId'],
                    deviceId: device['deviceId'],
                    channelId: output,
                    name: 'output_device_' + output,
                    type: 'output',
                    flows: '',
                    capacity: '',
                    status: true
                };
                subDevices.push(subDevice);
            }

            for (let analog = 1; analog <= parseInt(device['analogs']); analog++) {
                const subDevice = {
                    userId: device['userId'],
                    deviceId: device['deviceId'],
                    channelId: analog,
                    name: 'analog_device_' + analog,
                    type: 'analog',
                    flows: '',
                    capacity: '',
                    status: true
                };
                subDevices.push(subDevice);
            }
            resolve({
                status: true,
                subDevices
            });
        } catch(error) {
            console.log(error);
            resolve({
                status: false,
                error: error.message
            });
        }
    });
};