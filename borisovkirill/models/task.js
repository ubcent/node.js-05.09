// Модуль с моделью данных для задач
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const taskSchema = new Schema({
    description: { type:String },
    isCompleted: { type:Boolean, default:false },
});

module.exports = mongoose.model('Task', taskSchema, 'tasks');