const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  path: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Permissions = mongoose.model('permission', PermissionSchema);

module.exports = Permissions;
