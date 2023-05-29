const router = require('express').Router();

const authController = require('../controllers/auth');

router.post('/users/signup', authController.signUp);
router.post('/users/signin', authController.signIn);

module.exports = router;