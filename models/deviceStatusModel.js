const mongoose = require('mongoose');

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
    inputs: [{ 
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
    outputs: [{ 
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
    analogs: [{ 
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