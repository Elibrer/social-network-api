const { ObjectId } = require("bson");
const { User, Thought } = require("../models");

const userCount = async () => {
  const numberOfUsers = await User.aggregate().count("userCount");
  return numberOfUsers;
};

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
        .populate("friends thoughts");
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
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
      const userCheck = await User.find({});

      //check within userCheck to see if username or email already exists within
      //the database

      for (let i = 0; i < userCheck.length; i++) {
        if (userCheck[i].username === req.body.username) {
          return res.status(400).json({
            message: "Username already exists",
          });
        } else if (userCheck[i].email === req.body.email) {
          return res.status(400).json({
            message: "Email already exists",
          });
        }
      }

      const user = await User.create(req.body);

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId });

      if (req.body.username !== userData.username) {
        await Thought.findOneAndUpdate(
          { username: userData.username },
          { $set: { username: req.body.username } }
        );
      }

      // Prevents friends and thoughts from being updated (as they can be added and deleted separately)
      const { friends, thoughts, ...body } = req.body;

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  // Delete a user and remove associated thoughts
  async deleteUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId });
      console.log(userData.thoughts);

      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      await Thought.deleteMany({ _id: { $in: userData.thoughts } });

      await User.updateMany(
        { friends: { $in: req.params.userId } },
        { $pull: { friends: req.params.userId } }
      );

      res.json({
        message: "User and associated thoughts successfully deleted",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a friend
  async addFriend(req, res) {
    try {
      /* Check if friend exists in friend list */
      const friendCheck = await User.findOne({ _id: req.params.userId });
      if (friendCheck && friendCheck.friends.includes(req.body.friend_id)) {
        return res.status(404).json({ message: "Friend already exists" });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.body.friend_id } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      /* Ensures that the friend is added to the friend's list as well */
      const friend = await User.findOneAndUpdate(
        { _id: req.body.friend_id },
        { $push: { friends: req.params.userId } },
        { runValidators: true, new: true }
      );
      if (!friend) {
        return res
          .status(404)
          .json({ message: "No friend or user with that ID" });
      }

      console.log(
        `\x1b[41mFriends successfully added to each others profiles\x1b[0m`
      );

      res.json({
        message: "Friends successfully added to each others profiles",
        user,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a friend
  async removeFriend(req, res) {
    try {
      /* Check if friend exists in friend list */
      const checkFriend = await User.findOne({ _id: req.params.userId });
      if (!checkFriend) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      /* Ensures that the user has the friend in their friends list */
      if (!checkFriend.friends.includes(req.params.friendId)) {
        return res.status(404).json({ message: "No friend with that ID" });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      /* Ensures that the friend is removed from the friend's list as well */
      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId } },
        { runValidators: true, new: true }
      );

      console.log(
        `\x1b[41mFriends successfully removed from each others profiles\x1b[0m`
      );

      res.json({
        message: "Friends successfully removed from each others profiles",
        user,
        friend,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
