import express from 'express';
import crypto from 'crypto';

const router = express.Router();

let tweets = [
  {
    id: '123',
    text: 'tweet message1',
    username: 'user1',
    name: 'tom',
    createdAt: new Date('2021-06-01'),
  },
  {
    id: '124',
    text: 'tweet message2',
    username: 'user2',
    name: 'bob',
    createdAt: new Date('2021-06-15'),
  },
  {
    id: '125',
    text: 'tweet message3',
    username: 'user3',
    name: 'anne',
    createdAt: new Date('2021-05-15'),
  },
];

router.get('/', (req, res) => {
  if (req.query.username) {
    // username으로 특정 user가 작성한 모든 트윗 조회
    const filtered = tweets.filter((tweet) => tweet.username === req.query.username);

    if (filtered.length > 0) {
      res.status(200).json(filtered);
    } else {
      const error = {
        result: 'error',
        error: {
          name: 'NotFoundError',
          message: 'Any tweet is not found, written by this user',
          code: 404,
        },
      };
      res.status(404).json(error);
    }
  } else {
    // 모든 트윗 조회
    res.status(200).json(tweets);
  }
});

router.get('/:id', (req, res) => {
  // id로 특정 트윗 조회
  const id = req.params.id;
  const filtered = tweets.find((tweet) => tweet.id === id);

  if (filtered) {
    res.status(200).json(filtered);
  } else {
    const error = {
      result: 'error',
      error: {
        name: 'NotFoundError',
        message: 'Any tweet is not found, matched with this id',
        code: 404,
      },
    };
    res.status(404).json(error);
  }
  res.send('Get /tweets/:id');
});

function tweetValidator(tweet) {
  if (!tweet.name || !tweet.text || !tweet.username) return false;

  return true;
}

router.post('/', (req, res) => {
  // 트윗 생성
  const tweet = req.body;

  if (tweetValidator(tweet)) {
    const id = crypto.randomBytes(16).toString('hex');
    const createdAt = new Date();

    const newTweet = { id, createdAt, ...tweet };

    tweets.push(newTweet);
    res.status(201).json(newTweet);
  } else {
    const error = {
      result: 'error',
      error: {
        name: 'ValidationError',
        message: 'A invalid input is submitted',
        code: 400,
      },
    };
    res.status(400).json(error);
  }
});

router.put('/:id', (req, res) => {
  // 트윗 수정
  const id = req.params.id;
  const input = req.body;
  const target = tweets.find((tweet) => tweet.id === id);

  if (target) {
    let updated;

    tweets.map((tweet) => {
      if (tweet.id !== id) return tweet;
      updated = { ...tweet, ...input };
      return updated;
    });

    res.status(200).json(updated);
  } else {
    const error = {
      result: 'error',
      error: {
        name: 'NotFoundError',
        message: 'Any tweet is not found, matched with this id',
        code: 404,
      },
    };
    res.status(404).json(error);
  }
});

router.delete('/:id', (req, res) => {
  // 트윗 삭제
  const id = req.params.id;
  const target = tweets.find((tweet) => tweet.id === id);

  if (target) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
    res.sendStatus(204);
  } else {
    const error = {
      result: 'error',
      error: {
        name: 'NotFoundError',
        message: 'Any tweet is not found, matched with this id',
        code: 404,
      },
    };
    res.status(404).json(error);
  }
});

export default router;
