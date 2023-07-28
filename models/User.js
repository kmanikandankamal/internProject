const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true],
    validate: [validator.isEmail],
  },

  password: { type: String, required: true, minlength: 8 },

  passwordConfirm: {
    type: String,
    required: true,

    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match',
    },
  },

  role: { type: String, required: true },
});

//middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
