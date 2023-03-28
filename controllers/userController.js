const { User, Thought } = require ('../models');

module.exports = {

    //-----------------------Get all Users
    getUsers(req, res) {
        User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    //-----------------------Get single User
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('__v')
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'No User with that ID'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    //-----------------------Create a User
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    //-----------------------Delete a User
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
        !user
            ?res.status(404).json({ message: 'No user with that ID' })
            : Thought.deleteMany({ _id: { $in: user.thoughts }})
        )
        .then(() => res.json({ message: 'No thought with that ID' } ))
        .catch((err) => res.status(500).json(err));
    },

    //-----------------------Update a User
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(course)
          )
          .catch((err) => res.status(500).json(err));
      },


//-------------------------------ADD FRIENDS

//-----------------------------Add Friend to User (Same Code as ThoughtController but for Users and Friends)

addFriend(req, res) {
    User.findOneAndUpdate( 
        { _id: req.params.userId },
        { $addToSet: { friend: req.body } },
        { runValidators: true, new: true}
    )
    .then ((user) => 
    !user
    ? res
        .status(404)
        .json({ message: 'No User with that ID'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
}, 

//------------------------- Delete Reaction

deleteFriend (req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friend: { friendId: req.params.friendId } } },
        { runValidators: true, new: true}
    )
    .then ((user) =>
    !user
        ? res
            .status(404)
            .json({ message: 'No User With that ID' } )
            : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},

};