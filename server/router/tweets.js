import express from 'express';
import 'express-async-errors';
import controller from '../controller/tweetsContoroller.js';
import data from '../data/tweets.js';

let tweets = [...data];

const router = express.Router();

router.get('/', (req, res) => {
  const username = req.query.username;
  const data = username ? controller.filterByUsername(username) : tweets;
  res.status(200).json(data);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const tweet = controller.findById(tweets, id);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

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
  const tweet = controller.findById(tweets, id);

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
  tweets = controller.removeById(tweets, id);
  res.sendStatus(204);
});

export default router;
