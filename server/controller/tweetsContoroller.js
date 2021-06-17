class TweetsController {
  filterByUsername(tweets, username) {
    return tweets.filter((tweet) => tweet.username === username);
  }

  findById(tweets, id) {
    return tweets.find((tweet) => tweet.id === id);
  }

  removeById(tweets, id) {
    return tweets.filter((tweet) => tweet.id !== id);
  }
}

export default new TweetsController();
