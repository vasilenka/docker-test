const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

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

const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log(`App started on PORT: ${port}...`)
})
