const router = require('express').Router();

const reposController = require('../controllers/repos');
const isAuth = require('../middleWares/is-auth');
const findRepo = require('../middleWares/find-repo');

router.get('/repos', isAuth, reposController.getRepos);
router.post('/repos', isAuth, reposController.addRepo);
router.delete('/repos/:repoId', isAuth, findRepo, reposController.deleteRepo);
router.post('/repos/:repoId', isAuth, findRepo, reposController.addItem);
router.delete('/repos/:repoId/:itemId', isAuth, findRepo, reposController.removeItem);
router.patch('/repos/:repoId/:itemId', isAuth, findRepo, reposController.updateItem);

module.exports = router;
