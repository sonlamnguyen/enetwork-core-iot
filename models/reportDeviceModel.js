const mongoose = require('mongoose');

const reportSubDevice = mongoose.Schema({ 
    type: {
        type: String,
        require: true
    },
    channelId: {
        type: Number,
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
}, { _id : false });

const reportDeviceSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: [true, 'Please fill your deviceId'],
    },
    inputs: [reportSubDevice],
    outputs: [reportSubDevice],
    analogs: [reportSubDevice],
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