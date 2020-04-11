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
            let subDevice = {
                userId: device['userId'],
                deviceId: device['deviceId'],
                channelId: 1,
                name: '',
                type: '',
                flows: '',
                capacity: '',
                status: true
            };
            const subDevices = [];
            for (let i = 1; i <= parseInt(device['inputs']); i++) {
                subDevice.channelId = i;
                subDevice.name = 'input_device_' + i;
                subDevice.type = 'input';
                subDevices.push(subDevice);
            }

            for (let i = 1; i <= parseInt(device['outputs']); i++) {
                subDevice.channelId = i;
                subDevice.name = 'output_device_' + i;
                subDevice.type = 'output';
                subDevices.push(output);
            }

            for (let i = 1; i <= parseInt(device['analogs']); i++) {
                subDevice.channelId = i;
                subDevice.name = 'analog_device_' + i;
                subDevice.type = 'analog';
                subDevices.push(analog);
            }
            resolve({
                status: true,
                subDevices
            });
        } catch(error) {
            resolve({
                status: false,
                error: error.message
            });
        }
    });
};