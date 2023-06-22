const usersData = [
  { username: "brandon_23" },
  { username: "brielle99" },
  { username: "brooksy" },
  { username: "brynn45" },
  { username: "caleb88" },
  { username: "carson22" },
  { username: "charlie57" },
  { username: "colton_13" },
  { username: "crazyconnor" },
  { username: "dallas24" },
  { username: "danny63" },
  { username: "david_29" },
  { username: "eliana76" },
  { username: "elijah_47" },
  { username: "emman95" },
  { username: "ethan_36" },
  { username: "gavin68" },
  { username: "grace_17" },
  { username: "hannah_52" },
  { username: "henry40" },
];

const thoughtsData = [
  {
    username: "brandon_23",
    thoughtText: `Just finished reading a great book. Highly recommend it!`,
  },
  {
    username: "brooksy",
    thoughtText: `Feeling inspired to start a new project. Excited to see where it leads!`,
  },
  {
    username: "caleb88",
    thoughtText: `Enjoying a beautiful day outdoors. Nature always brings me peace.`,
  },
  {
    username: "charlie57",
    thoughtText: `Had an amazing dinner at a new restaurant. The food was exceptional!`,
  },
  {
    username: "danny63",
    thoughtText: `Just booked my next adventure. Can't wait to explore a new destination!`,
  },
  {
    username: "elijah_47",
    thoughtText: `Feeling grateful for the small moments in life that bring joy and happiness.`,
  },
  {
    username: "ethan_36",
    thoughtText: `Reflecting on past experiences and the lessons they taught me. Growth is essential!`,
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
module.exports = { usersData, thoughtsData };
