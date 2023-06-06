const router = require('express').Router();

const reposController = require('../controllers/repos');
const isAuth = require('../middleWares/is-auth');

router.post('/repos', isAuth, reposController.addRepo);
router.delete('/repos/:repoId', isAuth, reposController.deleteRepo);
router.patch('/repos/:repoId', isAuth, reposController.addItem);
router.delete('/repos/:repoId/:itemId', isAuth, reposController.removeItem);

module.exports = router;
