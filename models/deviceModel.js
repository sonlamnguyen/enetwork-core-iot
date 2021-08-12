const mongoose = require('mongoose');

const subDevice = mongoose.Schema({ 
    channelId: {
        type: Number,
        required: [true, 'Please fill your channelId'],
    },
    name: {
        type: String,
        required: false,
        default: ''
    },
    type: {
        type: String,
        required: true,
    },
    flows: {
        type: String,
        required: false
    },
    capacity: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true
    }
}, { _id : false });

const deviceSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: [true, 'Please fill your deviceId'],
    },
    name: {
        type: String,
        required: false,
        default: ''
    },
    mdSim: {
        type: String,
        required: false,
        default: ''
    },
    firmVer: {
        type: String,
        required: false,
        default: ''
    },
    imeiSim: {
        type: String,
        required: false,
        default: ''
    },
    signal: {
        type: Number,
        required: false,
    },
    config: {
        type: String,
        required: false,
        default: ''
    },
    sdt: {
        type: [String],
        required: false
    },
    type: {
        type: Number,
        required: true,
    },
    inputs: [subDevice],
    outputs: [subDevice],
    analogs: [subDevice],
    longtitude: {
        type: String,
        required: false
    },
    latitude: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true
    },
    value: {
        type: Number,
        default: false
    },
    isSendSms: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

deviceSchema.pre('save', async function (next) {
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
      this.created_at = now;
    }
    next();
});

const Device = mongoose.model('device', deviceSchema);
module.exports = Device;