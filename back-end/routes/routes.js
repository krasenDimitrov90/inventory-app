const router = require('express').Router();

const usersRoutes = require('./users');
const postRoutes = require('./posts');

router.use(usersRoutes);
router.use(postRoutes);

module.exports = router;