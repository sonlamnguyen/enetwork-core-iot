'use strict';
const Promise = require('promise');

const SubDevice = require('../models/subDeviceModel');


module.exports.generateSubDevice = (device) => {
    return new Promise(async function(resolve, reject) {
        try {
            const subDevices = [];
            for (let i = 1; i <= parseInt(device['inputs']); i++) {
                const input = {
                    userId: device['userId'],
                    deviceId: device['deviceId'],
                    channelId: i,
                    name: 'input_device_' + i,
                    type: 'input',
                    flows: '',
                    capacity: '',
                    status: true
                };
                subDevices.push(input);
            }

            for (let i = 1; i <= parseInt(device['outputs']); i++) {
                const output = {
                    userId: device['userId'],
                    deviceId: device['deviceId'],
                    channelId: i,
                    name: 'output_device_' + i,
                    type: 'output',
                    flows: '',
                    capacity: '',
                    status: true
                };
                subDevices.push(output);
            }

            for (let i = 1; i <= parseInt(device['analogs']); i++) {
                const analog = {
                    userId: device['userId'],
                    deviceId: device['deviceId'],
                    channelId: i,
                    name: 'analog_device_' + i,
                    type: 'analog',
                    flows: '',
                    capacity: '',
                    status: true
                };
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