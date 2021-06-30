import { db, Users, Tweets } from '../db/database.js';

const SELECT_JOIN =
  'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id';
const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

export async function getAll() {
  const tweets = await Tweets.findAll({
    attributes: ['id', 'text', 'createdAt', 'userId'],
    include: [{ model: Users, attributes: ['username', 'name', 'url'] }],
    order: [['createdAt', 'DESC']],
  });
  return tweets.map((tweet) => {
    const { id, text, createdAt, userId, User } = tweet.dataValues;
    return { id, text, createdAt, userId, ...User.dataValues };
  });
}

export async function getAllByUsername(username) {
  const tweets = await Tweets.findAll({
    attributes: ['id', 'text', 'createdAt', 'userId'],
    include: [{ model: Users, attributes: ['username', 'name', 'url'] }],
    where: {
      '$User.username$': username,
    },
    order: [['createdAt', 'DESC']],
  });
  return tweets.map((tweet) => {
    const { id, text, createdAt, userId, User } = tweet.dataValues;
    return { id, text, createdAt, userId, ...User.dataValues };
  });
}

export async function getById(id) {
  const tweets = await Tweets.findAll({
    attributes: ['id', 'text', 'createdAt', 'userId'],
    include: [{ model: Users, attributes: ['username', 'name', 'url'] }],
    where: {
      id,
    },
  });
  if (tweets.length > 0) {
    const { id: tweetId, text, createdAt, userId, User } = tweets[0].dataValues;
    return { id: tweetId, text, createdAt, userId, ...User.dataValues };
  } else {
    return null;
  }
}

export async function create(text, userId) {
  const tweet = await Tweets.create({
    text,
    createdAt: new Date(),
    userId,
  });
  return getById(tweet.id);
}

export async function update(id, text) {
  await Tweets.update({ text }, { where: { id } });
  return await getById(id);
}

export async function remove(id) {
  return Tweets.destroy({
    where: { id },
  });
}
