const User = require('../models/users');
const bcrypt = require('bcryptjs');

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
            console.log(err.message);
            res.status(401).json({ message: err.message });
        });
};

module.exports.signIn = (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error('Email not found!');
                error.statusCode = 401;
                throw error;
            }

            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password');
                error.statusCode = 401;
                throw error;
            }
        })
        .catch(err => {
            res.json(err);
        })

};