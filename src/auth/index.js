import {router} from '../main';

const API_URL = 'http://localhost:3000/api/';
const LOGIN_URL = API_URL + 'authenticate';
const SIGNUP_URL = API_URL + 'signup';

export default {
  user: {
    authenticated: false
  },
  login(context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds).then((data) => {
      localStorage.setItem('token', data.token);
      this.user.authenticated = true;

      if(redirect) {
        router.go(redirect);
      }
    }, (err) => {
      context.error = err.body.message;
    });
  },
  signup(context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds).then((data) => {
      localStorage.setItem('token', data.token);
      this.user.authenticated = true;

      if(redirect) {
        router.go(redirect);
      }
    }, (err) => {
      context.error = err.body.message;
    });
  },
  logout() {
    localStorage.removeItem('token');
    this.user.authenticated = false;
  },
  checkAuth() {
    var jwt = localStorage.getItem('token');
    if(jwt) {
      this.user.authenticated = true;
    }
    else {
      this.user.authenticated = false;      
    }
  },
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
  }
};
