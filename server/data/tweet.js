let tweets = [
  {
    id: '123',
    text: 'tweet message1',
    username: 'user1',
    name: 'tom',
    createdAt: new Date('2021-06-01').toString(),
  },
  {
    id: '124',
    text: 'tweet message2',
    username: 'user2',
    name: 'bob',
    createdAt: new Date('2021-06-15').toString(),
  },
  {
    id: '125',
    text: 'tweet message3',
    username: 'user3',
    name: 'anne',
    createdAt: new Date('2021-05-15').toString(),
  },
];

export async function getAll() {
  return tweets;
}

export async function getAllByUsername(username) {
  return tweets.filter((tweet) => tweet.username === username);
}

export async function getById(id) {
  return tweets.find((tweet) => tweet.id === id);
}

export async function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createAt: new Date(),
    name,
    username,
  };

  return [tweet, ...tweets];
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
}

export async function remove(id) {
  return tweets.filter((tweet) => tweet.id !== id);
}
