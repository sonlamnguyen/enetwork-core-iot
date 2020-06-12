const mongoose = require('mongoose');


const statusSubDevice = mongoose.Schema({ 
        channelId: {
            type: Number,
            require: true
        }, 
        value: {
            type: Number,
            require: true
        }
}, { _id : false });

const deviceStatusSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'Please fill your userId'],
    },
    deviceId: {
        type: String,
        required: [true, 'Please fill your deviceId'],
    },
    type: {
        type: Number,
        required: true,
    }, 
    inputs: [statusSubDevice],
    outputs: [statusSubDevice],
    analogs: [statusSubDevice],
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

deviceStatusSchema.pre('save', async function (next) {
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
      this.created_at = now;
    }
    next();
});


const DeviceStatus = mongoose.model('device_status', deviceStatusSchema);
module.exports = DeviceStatus;