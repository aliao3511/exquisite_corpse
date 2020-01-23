const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');
const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');

// route imports
const users = require('./routes/api/users');
const images = require('./routes/api/images');
//

mongoose
    .connect(db, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => console.log('connected to mongoDB'))
    .catch(err => {
      console.log('error');
      console.log(err);
    });

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('../config/passport')(passport);
//

// DEPLOY
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// ROUTES
app.use('/api/users', users);
app.use('/api/images', images);

// const port = process.env.PORT || 5000;
// const server = app.listen(port, () => console.log(`server running on port ${port}`));

// SOCKET
/* const io = require('socket.io').listen(server);
io.on('connection', socket => {
    console.log('socket connected!');

    socket.on('join', room => {
        socket.join(room);
    });
    
    // socket.on('draw', data => socket.)

    socket.on('disconnected', () => console.log('socket disconnected!'));
}); */

module.exports = app;
