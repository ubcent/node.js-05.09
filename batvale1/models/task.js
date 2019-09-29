const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    uniq_id: Number,
    content: String,
    done: Boolean
});

module.exports = mongoose.model('Task', taskSchema, 'task_db')