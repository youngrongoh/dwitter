import express from 'express';
import tweetsRouter from './router/tweets.js';

const app = express();

app.use(express.json());

app.use('/tweets', tweetsRouter);

app.listen(8080);