import express from 'express';
import { body } from 'express-validator';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateTweet = [
  body('text').trim().isLength({ min: 3 }).withMessage('text should be at least 3 charactors'),
];

// GET /tweets
router.get('/', tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', tweetController.getTweet);

// POST /tweets
router.post('/', validateTweet, validate, tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', validateTweet, validate, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;
