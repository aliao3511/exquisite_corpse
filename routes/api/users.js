const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const keys = require('../../config/keys');
const User = require('../../models/User');
const { validateRegisterInput, validateLoginInput } = require('../../validation/users');

// POST /register - register user
router.post('/register', async (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    debugger
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ email: 'email already registered' });
    } else {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                // if (err) { throw err };
                newUser.password = hash;
                const user = await newUser.save().catch(err => console.log(err));

                const payload = { id: user.id, name: user.username };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            });
        });
    }
});

// POST /login - log in user
router.post('/login', async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    debugger
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // const { email, password } = req.body;
    const { identifier, password } = req.body;

    // const user = await User.findOne({ email });    
    const user = await User.findOne({ $or: [
        { email: identifier },
        { username: identifier }
    ] });    
    if (!user) {
        return res.status(404).json({ email: 'user does not exist'});
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
        const payload = { id: user.id, name: user.username };
        
        jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
            }
        );
    } else {
        return res.status(400).json({ password: 'incorrect password' });
    }
});

// GET /current - private auth route
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ 
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
  });  
});

module.exports = router;