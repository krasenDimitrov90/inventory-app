const router = require('express').Router();

const usersRoutes = require('./users');
const reposRoutes = require('./repos');

router.use(usersRoutes);
router.use(reposRoutes);

module.exports = router;