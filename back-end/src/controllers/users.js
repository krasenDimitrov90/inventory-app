const users = [
    {
        _id: 0,
        email: "w1rysa@abv.bg",
        repos: []
    },
    {
        _id: 1,
        email: "kraskata@abv.bg",
        repos: []
    },
];

module.exports.getUsers = (req, res, next) => {
    res.json(users);
};

module.exports.addUser = (req, res, next) => {
    const newUser = { _id: users.length, ...req.body };
    users.push(newUser);
    res.json({ message: `You've created a user ${newUser.email} with _id - ${newUser._id}` });
};