const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.signUp = (req, res, next) => {
    const {
        email,
        password,
    } = req.body;

    User
        .findOne({ email: email })
        .then(user => {
            if (user) {
                const error = new Error('This email is already taken!');
                error.statusCode = 401;
                throw error;
            }
            return bcrypt.hash(password.toString(), 12);
        })
        .then(hashedPw => {
            const user = new User({
                email: email,
                password: hashedPw,
                repos: []
            });
            return user.save();
        })
        .then(result => {
            res.json({ message: 'Successfuly signed up!' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 401;
            }
            next(err);
        });
};

module.exports.signIn = (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    let loadedUser = null;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error('Email not found!');
                error.statusCode = 401;
                throw error;
            }

            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password');
                error.statusCode = 401;
                throw error;
            }

            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                'chikinana',
                { expiresIn: '1h' }
            );

            res.status(200)
                .json({ token: token, userId: loadedUser._id.toString(), email: loadedUser.email })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 401;
            }
            next(err);
        })

};