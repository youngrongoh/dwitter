export default class TweetService {
  constructor(http) {
    this.http = http;
  }

  async getTweets(username) {
    const query = username ? `?username=${username}` : '';
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET',
    });
  }

  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method: 'POST',
      body: JSON.stringify({ text, username: 'ellie', name: 'Ellie' }),
      errorCode: 201,
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
      errorCode: 204,
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      body: JSON.stringify({ text }),
    });
  }
}
