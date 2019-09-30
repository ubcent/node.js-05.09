require('./api');
const session       = require('express-session');
const MongoStore    = require('connect-mongo')(session);
const init          = require('./init_server');

const app       = init.app;
const mongoose  = init.mongoose;

const Task      = require('./models/task');
const User      = require('./models/user');
const passport  = require('./auth');
const flash     = require('connect-flash');

const authCheck = (req, res, next) => {
    if(req.user) {
        next();
    } else {
        res.redirect('/');
    }
};
app.use(flash());
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'super secret phrase',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(passport.initialize);
app.use(passport.session);

app.get('/test-api', (req, res) => {
    res.render('api');
});

app.get('/', (req, res) => {

    res.render('index',{
        'error': req.flash('error')
    });
});
app.post('/', passport.authenticate);

app.use('/tasks', authCheck);

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find({user_id: req.user._id});

    res.render('tasks', {
        'tasks': tasks
    })
});

app.post('/tasks', async (req, res) => {
    const task = new Task({...req.body, ...{user_id: req.user._id}});
    const savedTask = await task.save();

    res.redirect('/tasks');
});

app.post('/tasks/complete', async (req, res) => {
    await Task.updateOne({_id: req.body.id}, { $set: { completed: true } });

    res.redirect('/tasks');
});

app.post('/tasks/delete', async (req, res) => {
    await Task.deleteOne({_id: req.body.id});

    res.redirect('/tasks');
});

app.get('/tasks/:id/edit', async (req, res) => {
    const task = await Task.findOne({_id: req.params.id});
    if(!task){
        return res.redirect('/tasks');
    }
    res.render('edit', {
        'task': task
    })
});
app.post('/tasks/:id/edit', async (req, res) => {
    await Task.updateOne({_id: req.body.id}, { $set: { title: req.body.title } });
    res.redirect('/tasks');

});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const user = new User(req.body);
    const savedUser = await user.save();

    res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.logout();

    res.redirect('/');
});
