const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: 'vasya@gmail.com',
    pass: '*******',
  }
});

smtpTransport.sendMail({
  from: 'Vasya Pupkin <vasya@gmail.com>',
  to: 'Petya Pupkin <petya@gmail.com>, Masha Pupkina <masha@gmail.com>',
  subject: 'Семейное торжество братьев Пупкиных',
  text: 'Приглашаем на торжество',
  html: '<b>Приглашаем</b> на торжество!',
}, (err, response) => {
  if(err) {
    throw err;
  } else {
    console.log('Message has been sent');
  }

  smtpTransport.close();
});