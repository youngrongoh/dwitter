import express from 'express';
import { body, query, validationResult } from 'express-validator';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};

// GET /tweets
router.get('/', tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', tweetController.getTweet);

// POST /tweets
router.post(
  '/',
  [
    body('text').isLength({ min: 2 }).withMessage('text have to be longger than 2'),
    body(['username', 'name'])
      .notEmpty()
      .withMessage('username and name have not to be empty'),
  ],
  validate,
  tweetController.createTweet
);

// PUT /tweets/:id
router.put(
  '/:id',
  body('text').isLength({ min: 2 }).withMessage('text have to be longger than 2'),
  validate,
  tweetController.updateTweet
);

// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;
