const { Thought, User } = require ('../models');

module.exports = {
    //-----------------------Get all Thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    //-----------------------Get Single Thought
    getSingleThought(req, res){
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
        !thought
        ? res.status(404).json({message: 'No Thought With That ID'})
        :res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    //-----------------------Create Thought
    createThought(req,res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    //-----------------------Delete A Thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No Thought With That ID' })
            : User.deleteMany({ _id: {$in: thought.User }})
            )
            .then(() => res.json({ message: 'Thought and Users Deleted!'}))
            .catch((err) => res.status(500).json(err));
    },
    //-----------------------Update a thought by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
            ?res.status(404).json({ message: 'No Thought With This ID' })
            : res.json(thought)
        )
        .catch((erer) => res.status(500).json(err));
    },
};