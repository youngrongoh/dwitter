export default class AuthService {
  constructor(http) {
    this.http = http;
    this.server = process.env.REACT_APP_BASE_URL;
  }
  async signup(username, password, name, email, url) {
    const user = await this.http.fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': this.server,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, name, email, url }),
    });
    sessionStorage.setItem('token', 'Bearer ' + user.token);
    console.log(user);
    return user;
  }

  async login(username, password) {
    const user = await this.http.fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': this.server,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    sessionStorage.setItem('token', 'Bearer ' + user.token);
    return user;
  }

  async me() {
    const token = sessionStorage.getItem('token');
    if (!token) return;
    const user = await this.http.fetch('/auth/me', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': this.server,
        Authorization: token,
      },
    });
    return user;
  }

  async logout() {
    sessionStorage.removeItem('token');
    return;
  }
}
