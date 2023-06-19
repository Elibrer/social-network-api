const { User, Thought } = require("../models");

const userCount = async () => {
  const numberOfUsers = await User.aggregate()
    .count('userCount');
  return numberOfUsers;
}

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try { 
      const users = await User.find();
      const userObj = {
        users,
        userCount: await userCount(),
      }; 
      res.json(userObj);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .select("-__v")
      if (!user) {
        res.status(404).json({ message: 'No user with that ID' })
      }
      return res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch(err) {
      res.status(500).json(err)
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // Delete a user and remove associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No such user exists' });
      }

      await Thought.deleteMany({ users: req.params.userId });

      res.json({ message: 'User and associated thoughts successfully deleted'})
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
