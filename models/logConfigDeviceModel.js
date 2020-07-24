const mongoose = require('mongoose');

const logConfigDeviceSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: [true, 'Please fill your deviceId'],
    },
    mdSim: {
        type: String,
        required: false
    },
    firmVer: {
        type: String,
        required: false
    },
    config: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    sdt1: {
        type: String,
        required: false
    },
    sdt2: {
        type: String,
        required: false
    },
    sdt3: {
        type: String,
        required: false
    },
    sdt4: {
        type: String,
        required: false
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

logConfigDeviceSchema.pre('save', async function (next) {
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
      this.created_at = now;
    }
    next();
});


const LogConfigDevice = mongoose.model('log_config_device', logConfigDeviceSchema);
module.exports = LogConfigDevice;