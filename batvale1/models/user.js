const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 12;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String},
    password: {type: String},
});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync(saltRounds);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
});

userSchema.methods.comparePassword = function (candidate) {
    return bcrypt.compareSync(candidate, this.password);
}

module.exports = mongoose.model('User', userSchema, 'users');