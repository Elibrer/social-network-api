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

  const friendArr = [];

  for (let i = 0; i < usersData.length; i++) {
    const friendArr = [];


    

  const allUsers = await User.find({})
  const userDocs = allUsers.map(user => user._doc);
  console.table(userDocs);

  console.table(thoughts)
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
