const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { usersData, thoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (usersCheck.length) {
    await connection.dropCollection('users');
  }

  await Thought.collection.insertMany(thoughts);
  const allThoughts = await Thought.find({})

  for (let i = 0; i < usersData.length; i++) {
    const { username } = usersData[i];
    const userThoughts = allThoughts.filter((thought) => thought.username === username);
    await User.create({
      username: username,
      email: `${username}@gmail.com`,
      thoughts: userThoughts,
    });
  }

  let allUsers = await User.find({})
  allUsers = allUsers.map(user => user._doc);

  for (let i = 0; i < usersData.length; i++) {
    const friendArr = [];
    
    const randomNumOfFriends = Math.floor(Math.random() * 6);

    for (let j = 0; j < randomNumOfFriends; j++) {
      const randomFriendIndex = Math.floor(Math.random() * 19);
      if (usersData[i].username !== allUsers[randomFriendIndex].username) {
        friendArr.push(allUsers[randomFriendIndex]._id.toString());
        // push  allUsers[i]._id to allUsers[randomFriendIndex] friend array
      }
    }
    const userId = allUsers[i]._id.toString();
    console.log(friendArr)
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { friends: friendArr } },
      { new: true }
    );
  }

  console.table(allUsers);
  console.table(thoughts)
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
