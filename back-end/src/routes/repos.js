const router = require('express').Router();

const reposController = require('../controllers/repos');

router.post('/repos', reposController.addRepo);

module.exports = router;
