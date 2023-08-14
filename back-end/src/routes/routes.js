const router = require('express').Router();

const authRoutes = require('./auth');
const reposRoutes = require('./repos');

router.use(authRoutes);
router.use(reposRoutes);

module.exports = router;