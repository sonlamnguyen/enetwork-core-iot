const mongoose = require('mongoose');

const deviceUserSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: [true, 'Please fill your deviceId'],
    },
    userIds: {
        type: [String],
        required: [true, 'Please fill your userId']
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

deviceUserSchema.pre('save', async function (next) {
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
      this.created_at = now;
    }
    next();
});

const DeviceUser = mongoose.model('device_user', deviceUserSchema);
module.exports = DeviceUser;