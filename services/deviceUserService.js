const _ = require('lodash');

const DeviceUsers = require('../models/deviceUserModel');

module.exports = {
    getDeviceIdsByUserId(userId) {
        return new Promise(async function(resolve, reject) {
            try {
                const response = [];
                const deviceUserData = await DeviceUsers.find({ userIds: userId});
                if (deviceUserData) {
                    for(let deviceUser of deviceUserData) {
                        response.push(deviceUser.deviceId);
                    }
                }
                resolve(response);
            } catch(error) {
                console.log(error);
                resolve(false);
            }
        });
    },
};
