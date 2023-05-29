const router = require('express').Router();

const authController = require('../controllers/auth');

router.get('/users', authController.getUsers);
router.post('/users', authController.addUser);

module.exports = router;