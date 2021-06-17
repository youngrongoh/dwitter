export default class TweetService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getTweets(username) {
    const query = username ? `?username=${username}` : '';
    return requestToServer({
      url: `${this.baseURL}/tweets${query}`,
      method: 'GET',
    });
  }

  async postTweet(text) {
    return requestToServer({
      url: `${this.baseURL}/tweets`,
      method: 'POST',
      body: JSON.stringify({ text, username: 'dan', name: 'Dan' }),
      errorCode: 201,
    });
  }

  async deleteTweet(tweetId) {
    return requestToServer({
      url: `${this.baseURL}/tweets/${tweetId}`,
      method: 'DELETE',
      errorCode: 204,
    });
  }

  async updateTweet(tweetId, text) {
    return requestToServer({
      url: `${this.baseURL}/tweets/${tweetId}`,
      method: 'PUT',
      body: JSON.stringify({ text }),
    });
  }
}

async function requestToServer({ url, method, body, errorCode = 200 }) {
  const response = await fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    data: body || undefined,
  });

  const data = await response.json();
  if (response.status !== errorCode) {
    throw new Error(data.message);
  }

  return data;
}
