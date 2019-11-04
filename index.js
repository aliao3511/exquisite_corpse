const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');
const fs = require('fs');
const AWS = require('aws-sdk');

const { ID, SECRET, BUCKET_NAME, BUCKET_NAME_PRO } = require('./config/aws');

// route imports
const users = require('./routes/api/users');
const images = require('./routes/api/images');
//

mongoose
    .connect(db, { userNewUrlParser: true })
    .then(() => console.log('connected to mongoDB'))
    .catch(err => console.log(err));

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);
//

// ROUTES
app.use('/api/users', users);
app.use('/api/images', images);
// app.get('/', (req, res) => {
//     // debugger
//     res.send('heyo');
// });
//

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`server running on port ${port}`));

// SOCKET
const io = require('socket.io').listen(server);
io.on('connection', socket => {
    console.log('socket connected!');

    socket.on('disconnected', () => console.log('socket disconnected!'));
    socket.on('test', msg => console.log(msg));
});