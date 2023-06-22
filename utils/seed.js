const connection = require("../config/connection");
const { Thought, User } = require("../models");
const { all } = require("../routes");
const { usersData, thoughtsData } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  let usersCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (usersCheck.length) {
    await connection.dropCollection("users");
  }

  await Thought.collection.insertMany(thoughtsData);
  const allThoughts = await Thought.find({});

  for (let i = 0; i < usersData.length; i++) {
    const { username } = usersData[i];
    const userThoughts = allThoughts.filter(
      (thought) => thought.username === username
    );
    await User.create({
      username: username,
      email: `${username}@gmail.com`,
      thoughts: userThoughts,
    });
  }

  // /* Create random number of friends for each user between 0-7.
  // Ensure duplicate friends aren't created, can't add yourself as a friend,
  // and when a friend is added it also adds the user as a friend in the friends friend list. */

  let allUsers = await User.find({});
  allUsers = allUsers.map((user) => user._doc);

  for (let i = 0; i < usersData.length; i++) {
    const friendArr = [];
    const userId = allUsers[i]._id.toString();

    const randomNumOfFriends = Math.floor(Math.random() * 6);

    for (let j = 0; j < randomNumOfFriends; j++) {
      const randomFriendIndex = Math.floor(Math.random() * 19);
      const userCheck = await User.findOne({ _id: userId });
    
      const randomFriendId = allUsers[randomFriendIndex]._id.toString();
      const isFriendAlreadyAdded = friendArr.includes(randomFriendId);
    
      if (
        (!userCheck.friends.includes(randomFriendId) ||
          !allUsers[randomFriendIndex].friends.includes(userId)) &&
        !isFriendAlreadyAdded &&
        usersData[i].username !== allUsers[randomFriendIndex].username
      ) {
        friendArr.push(randomFriendId);
        await User.findOneAndUpdate(
          { _id: randomFriendId },
          { $push: { friends: userId } },
          { new: true }
        );
      }
    }

    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { friends: friendArr } },
      { new: true }
    );
  }

  // /* Console table readable data */

  let userTable = await User.find({});
  userTable = userTable.map((user) => {
    const friends = user._doc.friends.length;
    const thoughts = user._doc.thoughts.length;
    const { username, email } = user._doc;
    return { username, email, thoughts, friends };
  });

  let thoughtTable = await Thought.find({});
  thoughtTable = thoughtTable.map((thought) => {
    const reactions = thought._doc.reactions.length;
    const { username, thoughtText } = thought._doc;
    return { username, thoughtText, reactions };
  });

  console.table(userTable);
  console.table(thoughtTable);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
