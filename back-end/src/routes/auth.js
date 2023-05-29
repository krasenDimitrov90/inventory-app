const router = require('express').Router();

const authController = require('../controllers/auth');

router.post('/users/signup', authController.signUp);

module.exports = router;