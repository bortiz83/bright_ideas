const User = require('../models/user.model');

module.exports.registerUser = (req, res) => {
    console.log(req.body);
    User.create(req.body)
        .then(newUser => res.json({ user: newUser}))
        .catch(err => res.json({ message: 'Could not register a new user ' + req.body, error: err}));
};

module.exports.findUser = (req, res) => {
    User.findOne({ _id: req.params.id }, { password: 0 })
        .then(user => res.json({ user: user}))
        .catch(err => res.json({message: 'An error occurred while finding the user ' + req.params.id, error: err}));
};

module.exports.loginUser = (req, res) => {
    let user = req.body;
    User.findOne({ email: user.email, password: user.password }, { password: 0 })
        .then(user => res.json({ user: user}))
        .catch(err => res.json({message: 'An error occurred while finding the user ' + user.email, error: err}));
};