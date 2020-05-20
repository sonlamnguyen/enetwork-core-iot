const mongoose = require('mongoose');

const logStatusDeviceSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: [true, 'Please fill your deviceId'],
    },
    status: {
        type: Boolean
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

logStatusDeviceSchema.pre('save', async function (next) {
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
      this.created_at = now;
    }
    next();
});


const LogStatusDevice = mongoose.model('log_status_device', logStatusDeviceSchema);
module.exports = LogStatusDevice;