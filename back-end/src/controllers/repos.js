const Repo = require('../models/repos');
const User = require('../models/users');
const mongoose = require('mongoose');

module.exports.getRepos = (req, res, next) => {
    const userId = req.userId;
    let repos = [];

    User
        .findById(userId)
        .then(user => {
            repos = user.repos;
            res.json(repos);
        })
        .catch(err => {
            next(err);
        })
};

module.exports.getRepoItems = (req, res, next) => {
    const userId = req.userId;
    const repoId = req.params.repoId;

    Repo
        .findById(repoId)
        .then(repo => res.json(repo.items))
        .catch(err => {
            next(err);
        })
};

module.exports.getRepoExpiringItems = (req, res, next) => {
    const repoId = req.params.repoId;

    Repo
        .aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(repoId) } },
            {
                $project: {
                    _id: 0,
                    items: {
                        $filter: {
                            input: "$items", as: "newitems", cond: { $lt: ["$$newitems.qty", "$$newitems.min-qty"] }
                        }
                    }
                }
            }
        ])
        .then(result => {
            res.json(result[0].items);
        })
        .catch(err => {
            next(err);
        })

};

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

module.exports.updateUserRepoName = (req, res, next) => {
    const userId = req.userId;
    const repoId = req.params.repoId;
    const newRepoName = req.body.name;

    User
        .updateOne(
            {
                _id: new mongoose.Types.ObjectId(userId),
                "repos.repoId": new mongoose.Types.ObjectId(repoId),
            },
            { $set: { "repos.$.name": newRepoName } }
        )
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            next(err);
        })
};

module.exports.deleteRepo = (req, res, next) => {
    const userId = req.userId;
    const repo = req.repo;

    Repo
        .findByIdAndDelete(repo._id)
        .then(result => User.findById(userId))
        .then(user => {
            user.repos.pull(repo._id);
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

    const repo = req.repo;

    repo
        .addItem(item)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            next(err);
        });
};

module.exports.removeItem = (req, res, next) => {
    const itemId = req.params.itemId;

    const repo = req.repo;

    repo
        .removeItem(itemId)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            next(err);
        })
};

module.exports.updateItem = (req, res, next) => {
    const itemId = req.params.itemId;

    const updatedItem = req.body;
    const repo = req.repo;

    repo
        .updateItem(itemId, updatedItem)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            next(err);
        });
};