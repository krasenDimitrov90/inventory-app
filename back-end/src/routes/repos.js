const router = require('express').Router();

const reposController = require('../controllers/repos');
const isAuth = require('../middleWares/is-auth');
const findRepo = require('../middleWares/find-repo');

router.get('/repos', isAuth, reposController.getRepos);
router.get('/repos/:repoId', isAuth, findRepo, reposController.getRepoItems);
router.get('/repos/expiring/:repoId', isAuth, findRepo, reposController.getRepoExpiringItems);
router.post('/repos', isAuth, reposController.addRepo);
router.delete('/repos/:repoId', isAuth, findRepo, reposController.deleteRepo);
router.post('/repos/:repoId', isAuth, findRepo, reposController.addItem);
router.delete('/repos/:repoId/:itemId', isAuth, findRepo, reposController.removeItem);
router.patch('/repos/import-repo', isAuth, findRepo, reposController.importRepo);
router.patch('/repos/:repoId/:itemId', isAuth, findRepo, reposController.updateItem);
router.patch('/repos/:repoId', isAuth, reposController.updateUserRepoName);

module.exports = router;
