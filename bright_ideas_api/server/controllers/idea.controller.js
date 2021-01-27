const Idea = require('../models/idea.model');
const User = require('../models/user.model');

module.exports.createNewIdea = (req, res) => {
    Idea.create(req.body)
        .then(newIdea => {
            User.findById(newIdea.whoPosted._id).then(user => {
                user.posts.push(newIdea._id);
                user.save(function (err, obj) {
                    console.log('Updated users posts successfully');
                });
                res.json({ idea: newIdea})
            });
        })
        .catch(err => res.json({ message: 'Could not create a new idea', error: err}));
};

module.exports.findSingleIdea = (req, res) => {
    Idea.findOne({ _id: req.params.id })
        .then(singleIdea => res.json({ idea: singleIdea}))
        .catch(err => res.json({message: 'An error occurred while finding the idea', error: err}));
};

module.exports.findAllIdeas = (req, res) => {
    Idea.find()
        .sort({numberOfLikes: "Descending"})
        .then(allIdeas => res.json({ ideas: allIdeas}))
        .catch(err => res.json ({message: "Something went wrong when fetching all the ideas", error: err}))
};

module.exports.deleteSingleIdea = (req, res) => {
    Idea.deleteOne({_id: req.params.id})
        .then(result => res.json({result: result}))
        .catch(err => res.json ({message: "Something went wrong while deleting an idea", error: err}))
};

module.exports.updateIdea = (req, res) => {
    Idea.findByIdAndUpdate({ _id: req.params.id}, req.body.idea, {new: true})
        .then(p => {
            User.findById(req.body.userid).then(user => {
                user.ideasLiked.push(req.params.id);
                user.save(function (err, obj) {
                    console.log('Updated users posts successfully');
                });
                res.json({idea: p});
            });
        })
        .catch(err => res.json({message: 'Oops, could not update the idea', error: err}));
};