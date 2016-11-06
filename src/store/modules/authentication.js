import Vue from 'vue'

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
}

const mutations = {
  [types.LOGIN] (state, token, profile) {
    state.profile = profile;
    state.isAuthenticated = true;
    localStorage.setItem('token', token);
    Vue.http.headers.common['Authorization'] = token;
  },
  [types.LOGOUT] (state) {
    state.profile = {};
    state.isAuthenticated = false;
    localStorage.removeItem('token');
    Vue.http.headers.common['Authorization'] = '';
  },
  [types.PROFILE] (state, profile) {
    state.profile = profile;
    state.isAuthenticated = true;
  }
}

const actions = {
  getProfile({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('token');

      Vue.http.get(URLS.PROFILE_URL, {
        headers: { 'Authorization': token}
      })
        .then((data) => {
          console.log('Successfully authenticated from JWT');
          commit(types.PROFILE, data.body.profile);
          resolve();
        })
        .catch((err) => {
          console.log('Failed to authenticate JWT');
          localStorage.removeItem('token')
          reject();
        });
    });
  },
  login({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      Vue.http.post(URLS.LOGIN_URL, credentials)
        .then((data) => {  
          console.log('Successfully logged in user');
          commit(types.LOGIN, data.body.token, data.body.profile)
          resolve();
        })
        .catch((err) => {
          reject(err.body.message);
        });    
    });
  },
  signup({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      Vue.http.post(URLS.SIGNUP_URL, credentials)
        .then((data) => {
          console.log('Successfully created user');
          commit(types.LOGIN, data.body.token, data.body.profile)
          resolve();
        })
        .catch((err) => {
          reject(err.body.message);
        });
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