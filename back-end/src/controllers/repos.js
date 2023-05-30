const Repo = require('../models/repos');

module.exports.addRepo = (req, res, next) => {
    console.log('addRepo');
    const repo = new Repo({
        items: [{
            name: req.body.name,
            'min-qty': req.body['min-qty'],
            qty: req.body.qty,
            unit: req.body.unit
        }],
        ownerId: '647430f940f6e8f5acc795c4'
    });

    repo.save()
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err.message)
            next(err);
        });
};