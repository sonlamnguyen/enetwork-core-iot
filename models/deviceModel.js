const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'Please fill your userId']
    },
    deviceId: {
        type: String,
        required: [true, 'Please fill your deviceId'],
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
    inputs: {
        type: Number,
        required: true
    },
    outputs: {
        type: Number,
        required: true
    },
    analogs: {
        type: Number,
        required: true
    },
    status: {
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