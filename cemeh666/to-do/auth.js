const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User     = require('./models/user');

passport.use(new Strategy( async (name, password, done) => {
    const user = await User.findOne({name});

    if(!user) {
        return done(null, false);
    }

    if(!user.comparePassword(password)) {
        return done(null, false);
    }

    const plainUser = JSON.parse(JSON.stringify(user));
    delete plainUser.password;

    done(null, plainUser);
}));

passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);

    const plainUser = JSON.parse(JSON.stringify(user));
    delete plainUser.password;

    done(null, plainUser);
});

module.exports = {
    initialize: passport.initialize(),
    session: passport.session(),
    authenticate: passport.authenticate('local', {
        successRedirect: '/tasks',
        failureRedirect: '/',
        failureFlash:    'Неверный логин или пароль'
    })
};