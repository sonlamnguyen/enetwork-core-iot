const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  permissions: {
    type: Object,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Roles = mongoose.model('roles', RoleSchema);

module.exports = Roles;
