const io = require('socket.io-emitter')({ 
    host: process.env.REDIS_HOST, 
    port: process.env.REDIS_PORT, 
    key: process.env.REDIS_NAMESPACE
});

const User = require('../models/userModel');
const DeviceUser = require('../models/deviceUserModel');

module.exports = {
    async emitStatusSocketByDeviceId(deviceId, data) {
        // send admin
        const user = await User.findOne({role: 'admin'});
        io.to(user._id).emit('status', data);

        // send user share device
        const deviceUser = await DeviceUser.findOne({deviceId});
        if (!deviceUser) {
            console.log('Device User not found');
            return ;
        }
        const userIds = deviceUser.userIds ? deviceUser.userIds : [];
        if(userIds.length > 0) {
            for(let userId of userIds) {
                io.to(userId).emit('status', data);
            }
        }
    },
};