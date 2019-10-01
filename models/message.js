const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  author: { type: String },
  text: { type: String },
  created: { type: Date, default: new Date() },
});

module.exports = mongoose.model('Message', messageSchema, 'messages');