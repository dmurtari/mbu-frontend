import axios from 'axios';

import * as types from '../mutation-types';
import URLS from '../../urls';

const state = {
  users: []
};

const getters = {
  users(state) {
    return state.users;
  }
};

const mutations = {
  [types.GET_USERS] (state, users) {
    state.users = users;
  }
};

const actions = {
  getUsers({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(URLS.USERS_URL)
        .then((response) => {
          console.log('Received users', response.data);
          commit(types.GET_USERS, response.data)
          resolve();
        })
        .catch((err) => {
          console.log('Error retreiving users', err.data);
          reject();
        })
    })
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};