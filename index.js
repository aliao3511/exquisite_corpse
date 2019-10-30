const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');

mongoose
    .connect(db, { userNewUrlParser: true })
    .then(() => console.log('connected to mongoDB'))
    .catch(err => console.log(err));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));