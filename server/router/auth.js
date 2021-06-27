import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controller/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validteCredential = [
  body('username').trim().notEmpty().withMessage('username shoud be at least 5 characters'),
  body('password').trim().isLength({ min: 5 }).withMessage('password shoud be at least 5 characters'),
  validate,
]

const validateSignup = [
  ...validteCredential,
  body('name').notEmpty().withMessage('name is missing'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('url').isURL().withMessage('invalid URL').optional({ nullable: true, checkFalsy: true }),
  validate,
]

router.post('/signup', validateSignup, authController.signup);

router.post('/login', validteCredential, authController.login)

router.post('/me', authController.me)

export default router;