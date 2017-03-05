import axios from 'axios';
import _ from 'lodash';

import * as types from '../mutation-types';
import URLS from '../../urls';

const state = {
  users: []
};

const getters = {
  users(state) {
    return state.users;
  },
  unapprovedUsers(state) {
    return _.filter(state.users, (user) => {
      return !user.approved;
    });
  }
};

const mutations = {
  [types.APPROVE_USER] (state, userId) {
    let user = _.find(state.users, (user) => {
      return user.id === userId;
    });

    user.approved = true;
  },
  [types.GET_USERS] (state, users) {
    state.users = users;
  }
};

const actions = {
  approveUser({ commit }, userId) {
    return new Promise((resolve, reject) => {
      axios.put(URLS.USERS_URL + userId)
        .then((response) => {
          console.log('Approved user', userId);
          commit(types.APPROVE_USER, userId);
          resolve();
        })
        .catch((err) => {
          console.error('Failed to approve user', err);
          reject();
        })
    });
  },
  getUsers({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(URLS.USERS_URL)
        .then((response) => {
          console.log('Received users', response.data);
          commit(types.GET_USERS, response.data);
          resolve();
        })
        .catch((err) => {
          console.error('Error retrieving users', err.data);
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