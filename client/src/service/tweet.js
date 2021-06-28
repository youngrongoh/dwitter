export default class TweetService {
  constructor(http) {
    this.http = http;
  }

  async getTweets(username) {
    const query = username ? `?username=${username}` : '';
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET',
      headers: {
        Authorization: sessionStorage.getItem('token'),
      },
    });
  }

  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method: 'POST',
      headers: {
        Authorization: sessionStorage.getItem('token'),
      },
      body: JSON.stringify({ text, username: 'ellie', name: 'Ellie' }),
      errorCode: 201,
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: {
        Authorization: sessionStorage.getItem('token'),
      },
      errorCode: 204,
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      headers: {
        Authorization: sessionStorage.getItem('token'),
      },
      body: JSON.stringify({ text }),
    });
  }
}
