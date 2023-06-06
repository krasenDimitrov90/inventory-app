const Repo = require('../models/repos');
const User = require('../models/users');

module.exports.addRepo = (req, res, next) => {

    const userId = req.userId;
    const repoName = req.body.repoName;
    const repo = new Repo({
        items: [],
        ownerId: userId
    });

    repo.save()
        .then(result => {
            return User.findById(userId.toString());
        })
        .then(user => {
            return user.addRepo(repo._id, repoName);
        })
        .then(result => {
            res.json(repo);
        })
        .catch(err => {
            next(err);
        });
};

module.exports.deleteRepo = (req, res, next) => {
    const userId = req.userId;
    const repoId = req.params.repoId;

    Repo
        .findById(repoId)
        .then(repo => {
            if (!repo) {
                const error = new Error('Repo not found');
                error.statusCode = 404;
                throw error;
            }
            if (repo.ownerId.toString() !== userId) {
                const error = new Error('Not Autorized!');
                error.statusCode = 401;
                throw error;
            }
            return Repo.findByIdAndDelete(repoId);
        })
        .then(result => User.findById(userId))
        .then(user => {
            user.repos.pull(repoId);
            return user.save();
        })
        .then(result => {
            res.json('Deleted repo');
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 401;
            }
            next(err);
        })
};

module.exports.addItem = (req, res, next) => {
    const item = {
        name: req.body.name,
        'min-qty': req.body['min-qty'],
        qty: req.body.qty,
        unit: req.body.unit,
    };

    const repoId = req.params.repoId;
    Repo
        .findById(repoId)
        .then(repo => {
            return repo.addItem(item);
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            next(err);
        })
};

module.exports.removeItem = (req, res, next) => {
    const repoId = req.params.repoId;
    const itemId = req.params.itemId;

    Repo
        .findById(repoId)
        .then(repo => {
           return repo.removeItem(itemId)
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            next(err);
        })
};