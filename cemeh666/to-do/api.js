const init = require('./init_server');
const cors = require('cors');
const jwt  = require('jsonwebtoken');

const app = init.app;

const Task      = require('./models/task');
const User      = require('./models/user');
const secret    = 'YmM4Njc4NDI0ZmM1ODE2ODUiLCJuYW1lIjoiYWRtaW4iLCJfX3YiOjAsImlhdCI6MTU2OTc1';

app.use(cors());
app.use('/api*[^auth]',(req, res, next) =>{

    if(!req.headers.authorization) {
        return res.json({
            status: 'Error',
            message: 'Пользователь не авторизован'
        });
    }
    const [type, token] = req.headers.authorization.split(' ');
    if(type !== 'Bearier') {
        return res.json({
            status: 'Error',
            message: 'Неверный тип токена'
        });
    }
    jwt.verify(token, secret, (err, payload) => {
        if(err) {
            return res.json({ message: 'Пользователь не авторизован' });
        }
        req.user = payload;

        next();
    });
});

app.post('/api/auth', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username});

    if(!user || !user.comparePassword(password)) {
        return res.json({
            status:  'Error',
            message: 'Неверный логин или пароль'
        });
    }
    const plainUser = JSON.parse(JSON.stringify(user));
    delete plainUser.password;

    res.json({
        status: 'Ok',
        token: jwt.sign(plainUser, secret, {
            expiresIn: '1d'
        }),
    });
});

app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find({user_id: req.user._id});

    res.json({
        status: 'Ok',
        tasks: tasks,
    });
});

app.post('/api/tasks', async (req, res) => {
    const task = new Task({...req.body, ...{user_id: req.user._id}});
    const savedTask = await task.save();

    res.json({
        status: 'Ok',
        task:   savedTask,
    });});

app.put('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    const task = await Task.findOne({_id: req.params.id});

    res.json({
        status: 'Ok',
        task:   task,
    });
});

app.patch('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, { $set: req.body });
    const task = await Task.findOne({_id: req.params.id});

    res.json({
        status: 'Ok',
        task:   task,
    });
});

app.delete('/api/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id);

    res.json({
        status: 'Ok',
        task:   task,
    });
});