const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    id: {
        type: String,
        required: true,
        default: "admin",
        unique: true
    },
    login: {
    type: String,
    required: true,
    unique: true,
    default: 'Administrator@admin.com'
  },
  password: {
    type: String,
    required: true,
    default: 'Administrator'
  },
  isAdmin: {
    type: Boolean,
    default: true
  }
});

adminSchema.pre('save', async function(next) {
    const admin = this;
    if (!admin.isModified('password')) {
      return next();
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(admin.password, salt);
      admin.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });
  
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

