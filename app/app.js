const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const User = require('./user');

mongoose.set('useFindAndModify', false);
mongoose
  .connect(
    'mongodb://mongo:27017/docker-test',
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log('MongoDB Connected....'))
  .catch(err => console.log(err));
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
  res.status(200).json({
    hello: 'world! 🌎'
  })
})

app.post('/', (req, res, next) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
  })

  user.save().then(user => {
    res.status(201).json({
      message: 'User created!',
      user: user
    })
  }).catch(err => {
    res.status(500).json({
      message: 'Oopss! 😮',
      error: err
    })
  })
})

const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log(`App started on PORT: ${port}...`)
})
