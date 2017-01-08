import axios from 'axios';
import _ from 'lodash';

import * as types from '../mutation-types';
import URLS from '../../urls';

const state = {
  scouts: []
};

const getters = {
  scouts(state) {
    return _.orderBy(state.scouts, 'lastname');
  }
};

const mutations = {
  [types.SET_SCOUTS] (state, scouts) {
    state.scouts = scouts;
  }
};

const actions = {
  addScout({ commit }, details) {
    return new Promise((resolve, reject) => {
      axios.post(URLS.USERS_URL + details.userId + '/scouts', details.scout)
        .then((response) => {
          console.log('Added scout', details.scout, 'for user', details.user_id);
          commit(types.SET_SCOUTS, response.details.user.scouts);
          resolve();
        })
        .catch((err) => {
          console.log('Failed to create scout with error', err.response.data.message);
          reject(err.response.data.message);
        })
    });
  },
  getScouts({ commit }, userId) {
    return new Promise((resolve, reject) => {
      axios.get(URLS.USERS_URL + userId + '/scouts')
        .then((response) => {
          console.log('Got scouts for user', userId, response.data[0].scouts);
          commit(types.SET_SCOUTS, response.data[0].scouts);
          resolve()
        })
        .catch((err) => {
          console.log('Failed to get scouts', err);
          reject();
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