const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { type: String },
    user_id: { type: Schema.ObjectId },
    completed: { type: Boolean, default: false },
}, {
    versionKey: false
});

module.exports = mongoose.model('Task', taskSchema, 'tasks');