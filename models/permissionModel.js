const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Permissions = mongoose.model('permission', PermissionSchema);

module.exports = Permissions;
