const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
  }
})

module.exports = mongoose.model('User', userSchema);
