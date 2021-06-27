import express from 'express';
import { body } from 'express-validator';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateTweet = [
  body('text').trim().isLength({ min: 3 }).withMessage('text should be at least 3 charactors'),
];

// GET /tweets
router.get('/', isAuth, tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', isAuth, tweetController.getTweet);

// POST /tweets
router.post('/', isAuth, validateTweet, validate, tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', isAuth, validateTweet, validate, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', isAuth, tweetController.deleteTweet);

export default router;
