import axios from 'axios';
import _ from 'lodash';

import * as types from '../mutation-types';
import URLS from '../../urls';

const state = {
  profile: {},
  isAuthenticated: false
};

const getters = {
  profile(state) {
    return state.profile;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  isTeacher(state) {
    return state.profile.role === 'teacher';
  },
  isCoordinator(state) {
    return state.profile.role === 'coordinator';
  },
  isAdmin(state) {
    return state.profile.role === 'admin';
  },
  isTeacherOrAdmin(state) {
    return state.profile.role === 'teacher' || state.profile.role === 'admin';
  },
  isCoordinatorOrAdmin(state) {
    return state.profile.role === 'coordinator' || state.profile.role === 'admin';
  }
}

const mutations = {
  [types.LOGIN] (state, response) {
    state.profile = response.profile;
    state.isAuthenticated = true;
    localStorage.setItem('token', response.token);
    axios.defaults.headers.common['Authorization'] = response.token;
  },
  [types.LOGOUT] (state) {
    state.profile = {};
    state.isAuthenticated = false;
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = '';
  },
  [types.PROFILE] (state, profile) {
    state.profile = profile;
    state.isAuthenticated = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
  }
}

const actions = {
  deleteAccount({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.delete(URLS.USERS_URL + id)
        .then((response) => {
          console.log('Account deleted');
          commit(types.LOGOUT);
          resolve();
        })
        .catch((err) => {
          console.log('Failed to delete account');
          reject();
        })
    });
  },
  getProfile({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('token');

      axios.get(URLS.PROFILE_URL, {
        headers: { 'Authorization': token}
      })
        .then((response) => {
          console.log('Successfully authenticated from JWT');
          commit(types.PROFILE, response.data.profile);
          resolve();
        })
        .catch((err) => {
          console.log('Failed to authenticate JWT');
          localStorage.removeItem('token');
          reject();
        });
    });
  },
  login({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      axios.post(URLS.LOGIN_URL, credentials)
        .then((response) => {  
          console.log('Successfully logged in user');
          commit(types.LOGIN, response.data);
          resolve();
        })
        .catch((err) => {
          console.log('Failed to login user');
          reject(err.response.data.message);
        });    
    });
  },
  signup({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      axios.post(URLS.SIGNUP_URL, credentials)
        .then((response) => {
          console.log('Successfully created user');
          commit(types.LOGIN, response.data);
          resolve();
        })
        .catch((err) => {
          console.log('Failed to create user');
          reject(err.response.data.message);
        });
    });
  },
  sendResetEmail({ commit }, email) {
    let data = {
      email: email,
      url: URLS.RESET_URL
    };

    return new Promise((resolve, reject) => {
      axios.post(URLS.FORGOT_URL, data)
        .then((response) => {
          console.log('Send reset email to', email);
          resolve();
        })
        .catch((err) => {
          console.log('Failed to send reset email');
          reject();
        });
    });
  },
  resetPassword({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post(URLS.RESET_API_URL, data)
        .then(() => {
          console.log('Reset password');
          resolve()
        })
        .catch((err) => {
          console.log('Failed to reset password');
          reject(err.response.data.message);
        });
    });
  },
  updateProfile({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.put(URLS.USERS_URL + data.id, data)
        .then((response) => {
          console.log('Updated profile');
          commit(types.LOGIN, response.data);
          resolve();
        })
        .catch((err) => {
          console.log('Failed to update profile');
          reject(err.response.data.message);
        })
    });
  },
  logout({ commit }) {
    console.log('Logging out');
    commit(types.LOGOUT);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}