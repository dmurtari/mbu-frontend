import axios from 'axios';

import * as types from '../mutation-types';
import URLS from '../../urls';

const state = {
  registrations: []
};

const getters = {
  registrations(state) {
    return state.registrations;
  }
};

const mutations = {
  [types.SET_REGISTRATIONS] (state, registrations) {
    state.registrations = registrations;
  }
};

const actions = {
  getRegistrations({ commit }, userId) {
    return new Promise((resolve, reject) => {
      axios.get(URLS.USERS_URL + userId + '/scouts/registrations')
        .then((response) => {
          console.log('Got registration for user', userId, response.data);
          commit(types.SET_REGISTRATIONS, response.data);
          resolve(response.date);
        })
        .catch((err) => {
          console.log('Failed to get registrations with error', err);
          reject(err.response.data.message);
        })
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};