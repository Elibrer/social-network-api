const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const { username } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: "No user with that username!" });
      }

      const thought = await Thought.create(req.body);

      await User.findOneAndUpdate(
        { username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: thought._id } }
      );

      console.log("\x1b[41mYou deleted a thought\x1b[0m", thought);

      res.json({ message: "Thought and reactions deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      /* Ensures only the thought text can be updated (Changing 'createdAt' wouldn't make sense,
      and you shoudln't be able to change the users username from the Thought model. */
      const { username, createdAt, reactions, ...updatedFields } = req.body;

      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: updatedFields },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought with this id!" });
      }
      console.log("\x1b[41mYou updated a thought\x1b[0m", updatedFields);

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Add a reaction
  async addReaction(req, res) {
    /* Failsafe to check if user exists. If it doesn't, return a 404. */
    const userData = await User.find();
    const existingUsername = userData.some(
      (user) => user.username === req.body.username
    );
    if (!existingUsername) {
      return res.status(404).json({ message: "No user with that username!" });
    }

    /* excludes the createdAt and reactionId from the req.body so they can't be updated. */
    const { createdAt, reactionId, ...updatedFields } = req.body;

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: updatedFields } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }
      // white background red text in console using ANSI escape codes
      // const ansiCode = '\x1b[41m%s\x1b[0m';
      console.log("\x1b[41mYou added a reaction\x1b[0m", updatedFields);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Remove a reaction
  async removeReaction(req, res) {
    try {
      
      const thought = await Thought.updateOne(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.body.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No reaction found with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
