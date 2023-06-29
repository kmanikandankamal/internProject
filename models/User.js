const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },

  password: { type: String, required: true, minlength: 8 },

  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },

  role: { type: String, required: true },
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
