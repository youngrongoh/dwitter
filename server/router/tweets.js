import express from 'express';
import 'express-async-errors';

const router = express.Router();

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

router.get('/', (req, res) => {
  const username = req.query.username;
  const data = username ? tweets.filter((tweet) => tweet.username === username) : tweets;
  res.status(200).json(data);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const tweet = tweets.find((tweet) => tweet.id === id);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

function tweetValidator(tweet) {
  if (!tweet.name || !tweet.text || !tweet.username) return false;

  return true;
}

router.post('/', (req, res) => {
  const { text, name, username } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    createAt: new Date(),
    name,
    username,
  };

  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

router.put('/:id', (req, res) => {
  // 트윗 수정
  const id = req.params.id;
  const { text } = req.body;
  const tweet = tweets.find((tweet) => tweet.id === id);

  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

router.delete('/:id', (req, res) => {
  // 트윗 삭제
  const id = req.params.id;
  tweets = tweets.filter((tweet) => tweet.id !== id);
  res.sendStatus(204);
});

export default router;
