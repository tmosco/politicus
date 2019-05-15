const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


const partyRoute = require('./api/route/party');
const userRoute = require('./api/route/user');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// To prevent Cors error
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type,Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT', 'PATCH', 'GET', 'DELETE', 'POST');
    return res.status(200).json({});
  }
  next();
});

app.use('/party', partyRoute);
app.use('/user', userRoute);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);

});


// this not needed from challenge 1 and 2
// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
//   next();
// });
module.exports = app;
