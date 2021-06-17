import express from 'express';
import 'express-async-errors';
import controller from '../controller/tweet.js';
import * as tweetRepository from '../data/tweet.js';

const router = express.Router();

router.get('/', (req, res) => {
  const username = req.query.username;
  const data = username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll();
  res.status(200).json(data);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const tweet = tweetRepository.getById(id);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

router.post('/', (req, res) => {
  const { text, name, username } = req.body;
  const tweet = tweetRepository.create(text, name, username);

  res.status(201).json(tweet);
});

router.put('/:id', (req, res) => {
  // 트윗 수정
  const id = req.params.id;
  const { text } = req.body;
  const tweet = tweetRepository.update(id, text);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

router.delete('/:id', (req, res) => {
  // 트윗 삭제
  const id = req.params.id;
  tweets = tweetRepository.remove(id);
  res.sendStatus(204);
});

export default router;
