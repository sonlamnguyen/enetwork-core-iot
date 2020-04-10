const mongoose = require('mongoose');

const subDeviceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'Please fill your userId']
    },
    deviceId: {
        type: String,
        required: [true, 'Please fill your deviceId'],
    },
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
        type: Number,
        required: true,
    },
    flows: {
        type: String,
        required: true
    },
    capacity: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date
    }
});

subDeviceSchema.pre('save', async function (next) {
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
      this.created_at = now;
    }
    next();
});


const SubDevice = mongoose.model('subDevice', subDeviceSchema);
module.exports = SubDevice;