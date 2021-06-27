import * as userRepository from './auth.js';

let tweets = [
  {
    id: '123',
    text: 'tweet message1',
    userId: '1',
    createdAt: new Date('2021-06-01').toString(),
  },
  {
    id: '124',
    text: 'tweet message2',
    userId: '1',
    createdAt: new Date('2021-06-15').toString(),
  },
  {
    id: '125',
    text: 'tweet message3',
    userId: '1',
    createdAt: new Date('2021-05-15').toString(),
  },
];

export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(tweet.userId);
      return { ...tweet, username, name, url };
    })
  );
}

export async function getAllByUsername(username) {
  return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username));
}

export async function getById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text, userId) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createAt: new Date(),
    userId,
  };

  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);

  if (tweet) {
    tweet.text = text;
  }

  return getById(tweet.id);
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
