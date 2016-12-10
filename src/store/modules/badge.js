import axios from 'axios';
import _ from 'lodash';

import * as types from '../mutation-types';
import URLS from '../../urls';

const state = {
  badges: []
};

const getters = {
  badges(state) {
    return _.orderBy(state.badges, 'name', 'asc');
  }
};

const mutations = {
  [types.ADD_BADGE] (state, badge) {
    state.badges.push(badge);
  },
  [types.GET_BADGES] (state, badges) {
    state.badges = badges;
  },
  [types.UPDATE_BADGE] (state, badge) {
    let index = _.indexOf(state.badges, { id: badge.id });
    state.badges.splice(index, 1, badge);
  }
};

const actions = {
  addBadge({ commit }, badge) {
    return new Promise((resolve, reject) => {
      axios.post(URLS.BADGES_URL, badge)
        .then((response) => {
          console.log('Created badge', response.data.badge)
          commit(types.ADD_BADGE, response.data.badge);
          resolve(badge);
        })
        .catch((err) => {
          console.log('Failed to create badge', err.response.data.message);
          reject(err.response.data.message);
        });
    });
  },
  getBadges({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(URLS.BADGES_URL)
        .then((response) => {
          console.log('Received badges', response.data)
          commit(types.GET_BADGES, response.data);
          resolve();
        })
    })
  },
  updateBadge({ commit }, badgeUpdate) {
    return new Promise((resolve, reject) => {
      axios.put(URLS.BADGES_URL + badgeUpdate.id, badgeUpdate)
        .then((response) => {
          console.log('Updated badge to', response.data.badge);
          commit(types.UPDATE_BADGE, response.data.badge);
          resolve(badgeUpdate);
        })
        .catch((err) => {
          console.log('Failed to update badge', err.response.data.message);
          reject(err.response.data.message);
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