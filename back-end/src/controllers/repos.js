const Repo = require('../models/repos');

module.exports.addRepo = (req, res, next) => {
    const repo = new Repo({
        items: [{
            name: req.body.name,
            'min-qty': req.body['min-qty'],
            qty: req.body.qty,
            unit: req.body.unit
        }],
        ownerId: req.userId
    });

    repo.save()
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            next(err);
        });
};