const mongoose = require('mongoose');

const reportDeviceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'Please fill your userId'],
    },
    deviceId: {
        type: String,
        required: [true, 'Please fill your deviceId'],
    },
    subDevices: [{ 
        type: {
            type: String,
            require: true
        },
        channelId: {
            type: String,
            require: true
        }, 
        value: {
            type: Number,
            require: true,
            default: 0
        },
        minute: {
            type: Number,
            require: true,
            default: 0
        },
        second: {
            type: Number,
            require: true,
            default: 0
        },
        status: {
            type: String,
            require: true,
            default: '1'
        }
    }],
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

reportDeviceSchema.pre('save', async function (next) {
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
      this.created_at = now;
    }
    next();
});


const ReportDevice = mongoose.model('report_device', reportDeviceSchema);
module.exports = ReportDevice;