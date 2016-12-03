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
  [types.GET_USERS] (state) {
    return true;
  }
};

const actions = {
  getUsers({ commit }) {
    return new Promise((resolve, reject) => {
      commit(types.GET_USERS);
      resolve();
    })
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};