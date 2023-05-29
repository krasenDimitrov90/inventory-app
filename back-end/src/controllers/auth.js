const User = require('../models/users');
const bcrypt = require('bcryptjs');

module.exports.signUp = (req, res, next) => {
    const {
        email,
        password,
    } = req.body;

    bcrypt
        .hash(password.toString(), 12)
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
            res.json(err);
        })
};