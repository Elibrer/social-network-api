

const usersData = [
  { username: 'brandon_23' },
  { username: 'brielle99' },
  { username: 'brooksy' },
  { username: 'brynn45' },
  { username: 'caleb88' },
  { username: 'carson22' },
  { username: 'charlie57' },
  { username: 'colton_13' },
  { username: 'crazyconnor' },
  { username: 'dallas24' },
  { username: 'danny63' },
  { username: 'david_29' },
  { username: 'eliana76' },
  { username: 'elijah_47' },
  { username: 'emman95' },
  { username: 'ethan_36' },
  { username: 'gavin68' },
  { username: 'grace_17' },
  { username: 'hannah_52' },
  { username: 'henry40' }
];

const thoughts = [
  {
    username: 'brandon_23',
    thoughtText: `Just finished reading a great book. Highly recommend it!`,
    reactions: [
      {
        reactionBody: `I loved it too!`,
        username: 'caleb88',
      },
      {
        
        reactionBody: `Sounds interesting. I might check it out.`,
        username: 'elijah_47',
      },
    ],
  },
  {
    username: 'brooksy',
    thoughtText: `Feeling inspired to start a new project. Excited to see where it leads!`,
    reactions: [
      {
        reactionBody: `That's awesome! Can't wait to see what you create.`,
        username: 'ethan_36',
      },
    ],
  },
  {
    username: 'caleb88',
    thoughtText: `Enjoying a beautiful day outdoors. Nature always brings me peace.`,
    reactions: [
      {
        reactionBody: `Nature is amazing. It helps me relax too.`,
        username: 'brandon_23',
      },
      {
        reactionBody: `I love spending time in nature!`,
        username: 'elijah_47',
      },
      { 
        reactionBody: `Agreed! It's so calming.`,
        username: 'ethan_36',
      },
    ],
  },
  {
    username: 'charlie57',
    thoughtText: `Had an amazing dinner at a new restaurant. The food was exceptional!`,
    reactions: [
      {
        
        reactionBody: `I need to try that place. Sounds delicious!`,
        username: 'brooksy',
      },
      {
        
        reactionBody: `I'm glad you enjoyed it! I should go there too.`,
        username: 'danny63',
      },
      {
        
        reactionBody: `Great food makes everything better.`,
        username: 'elijah_47',
      },
    ],
  },
  {
    username: 'danny63',
    thoughtText: `Just booked my next adventure. Can't wait to explore a new destination!`,
    reactions: [
      {
        
        reactionBody: `That's exciting! Have a great trip.`,
        username: 'charlie57',
      },
      {
        
        reactionBody: `I'm so jealous. Take lots of pictures!`,
        username: 'elijah_47',
      },
      {
        
        reactionBody: `Safe travels!`,
        username: 'ethan_36',
      },
    ],
  },
  {
    username: 'elijah_47',
    thoughtText: `Feeling grateful for the small moments in life that bring joy and happiness.`,
    reactions: [
      {
        
        reactionBody: `Gratitude is the key to happiness!`,
        username: 'brandon_23',
      },
      {
        
        reactionBody: `Couldn't agree more. Appreciating the little things matters.`,
        username: 'caleb88',
      },
    ],
  },
  {
    username: 'ethan_36',
    thoughtText: `Reflecting on past experiences and the lessons they taught me. Growth is essential!`,
    reactions: [
      {
        
        reactionBody: `'Learning from our experiences is what makes us grow.`,
        username: 'brooksy',
      },
      {
        
        reactionBody: `Absolutely! Embracing change is important for personal development.`,
        username: 'danny63',
      },
    ],
  },
];


// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
// const getRandomUsername = () => {
//   const username = `${getRandomArrItem(usernames)}`;
//   return [username]
// }


// Export the functions for use in seed.js
module.exports = { usersData, thoughts };
