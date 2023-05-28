const users = [
    {
        "7HYb8baEmXffGMOUCKuZgwFF63v1": {
            email: "w1rysa@abv.bg",
            repos: []
        }
    },
    {
        "M8woO4jFfQRXmgrdzppKZmdOL3E3": {
            email: "kraskata@abv.bg",
            repos: []
        }
    },
];

module.exports.getUsers = (req, res, next) => {
    res.json(users);
};

module.exports.addUser = (req, res, next) => {
    const newUser = req.body;
    console.log(newUser);
};