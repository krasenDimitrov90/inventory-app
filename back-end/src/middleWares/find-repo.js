const Repo = require('../models/repos');

module.exports = (req, res, next) => {
    const repoId = req.params.repoId;

    Repo
        .findById(repoId)
        .then(repo => {
            if (!repo) {
                const err = new Error('Resource not found!');
                err.statusCode = 404;
                next(err);
            }

            req.repo = repo;
            next();
        })
};