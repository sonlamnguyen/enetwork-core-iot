const mongoose = require('mongoose');

const reportRawDeviceSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: [true, 'Please fill your deviceId'],
    },
    config: {
        type: String,
        required: false,
    },
    input1: {
        type: String,
        required: false,
    },
    input2: {
        type: String,
        required: false,
    },
    input3: {
        type: String,
        required: false,
    },
    output1: {
        type: String,
        required: false
    },
    output2: {
        type: String,
        required: false
    },
    output3: {
        type: String,
        required: false
    },
    warning1: {
        type: String,
        required: false
    },
    warning2: {
        type: String,
        required: false
    },
    warning3: {
        type: String,
        required: false
    },
    backup1: {
        type: String,
        required: false
    },
    backup2: {
        type: String,
        required: false
    },
    backup3: {
        type: String,
        required: false
    },
    backup4: {
        type: String,
        required: false
    },
    backup5: {
        type: String,
        required: false
    },
    backup6: {
        type: String,
        required: false
    },
    backup7: {
        type: String,
        required: false
    },
    backup8: {
        type: String,
        required: false
    },
    backup9: {
        type: String,
        required: false
    },
    backup10: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date
    }
});

reportRawDeviceSchema.pre('save', async function (next) {
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
      this.created_at = now;
    }
    next();
});


const ReportRawDevice = mongoose.model('reportRawDevice', reportRawDeviceSchema);
module.exports = ReportRawDevice;