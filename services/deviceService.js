const _ = require('lodash');

const ThingService = require('./thingService');

module.exports = {
    processStatusDevices(data) {
        return new Promise(async function(resolve, reject) {
            try {
                const response = [];
                for(let device of data) {
                    const isConnection = await ThingService.connection(device.deviceId);
                    const tempDevice = device;
                    if (isConnection) { 
                        tempDevice['status'] = true;
                    } else {
                        tempDevice['status'] = false;
                    }

                    response.push(tempDevice);
                }
                resolve(response);
            } catch(error) {
                console.log(error);
                resolve(false);
            }
        });
    },

    processStatusDevice(data) {
        return new Promise(async function(resolve, reject) {
            try {
                const isConnection = await ThingService.connection(data.deviceId);
                if (isConnection) { 
                    data['status'] = true;
                } else {
                    data['status'] = false;
                }
                resolve(data);
            } catch(error) {
                console.log(error);
                resolve(false);
            }
        });
    },
};
