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
  [types.ADD_REGISTRATION] (state, details) {
    let scout = _.find(state.registrations, { id: details.scoutId });
    scout.registrations.push({ event_id: details.eventId });
  },
  [types.SET_REGISTRATIONS] (state, registrations) {
    state.registrations = registrations;
  }
};

const actions = {
  addRegistration({ commit }, details) {
    return new Promise((resolve, reject) => {
      axios.post(URLS.SCOUTS_URL + details.scoutId + '/registrations/', {
        event_id: details.eventId
      })
        .then((response) => {
          console.log('Created registration for scout', details.scoutId, 'event', details.eventId);
          commit(types.ADD_REGISTRATION, details);
          resolve();
        })
        .catch((err) => {
          console.log('Failed to register', details.scoutId, 'for', details.eventId);
          reject();
        })
    });
  },
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