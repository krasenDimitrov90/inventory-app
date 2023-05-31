const router = require('express').Router();

const reposController = require('../controllers/repos');
const isAuth = require('../middleWares/is-auth');

router.post('/repos', isAuth, reposController.addRepo);
router.delete('/repos/:repoId', isAuth, reposController.deleteRepo);

module.exports = router;
