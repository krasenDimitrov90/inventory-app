const router = require('express').Router();

const usersController = require('../controllers/users');

router.get('/users', usersController.getUsers);

router.post('/users', usersController.addUser);

module.exports = router;