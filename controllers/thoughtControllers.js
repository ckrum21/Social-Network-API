const{ User, Thought } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.find()
        .then((thought) => res.json(thought))
        .catch((thought) => res.json(thought))
    },

    getSingleThought(req, res) { 
    Thought.findOne({_id: req.params.thoughtId})
    .select('-__v')
    .then((thought) => 
    !thought 
        ? res.status(404).json({message: 'no thought with this ID'})
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
    Thought.create(req.body)
    .then(({ _id }) => {
    return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: _id } },
        { new: true }
            );
        })
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: "No User find with this ID!" })
        : res.json(thought)
         )
          .catch((err) => res.status(500).json(err));
      },

      updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, New: true}
        )
        .then((user) =>
        !user
        ? res.status(404).json({message: 'no thought with this Id!'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
      },

      deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
            .then((thought) =>
            !thought
                ? res.status(404).json({message: 'no thought with this ID!'})
                : User.findOneAndUpdate(
                    {thoughts: req.params.thoughtId}
                    {$pull: { thoughts: req.params.thoughtId}},
                    {new: true}
                )
            )
            .then((user) =>
            !user
            ? res.status(404).json({message: 'no user with this ID!'})
            :res.json({message: 'thought deleted'})
            )
        .catch((err) => res.status(500).json(err));
      },

      createReaction(req, res) {
        Thought.findOneAndUpdate(
         {_id: req.params.thoughtId},
            {$addToSet: {reaction: req.body}},
            {runValidators: true, new: true}   
        )
        .then((thought) =>
        !thought
            ? res.status(404).json({message: 'no thought with this ID!'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }  
        )
        .then((thought) =>
        !thought
            ? res.status(404).json({message: 'no thought with this ID!'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
};