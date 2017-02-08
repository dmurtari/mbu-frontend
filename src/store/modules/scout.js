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
  [types.ADD_REGISTRATION](state, registration) {
    let scout = _.find(state.scouts, { id: registration.scout_id });
    scout.registrations.push({
      preferences: [],
      event_id: registration.event_id,
      details: registration
    });
  },
  [types.ADD_SCOUT] (state, scout) {
    state.scouts.push(scout);
  },
  [types.DELETE_SCOUT] (state, scoutId) {
    state.scouts = _.reject(state.scouts, (existingScout) => {
      return existingScout.id === scoutId;
    });
  },
  [types.SET_PREFERENCES] (state, details) {
    let scout = _.find(state.scouts, { id: details.scoutId });
    let registration = _.find(scout.registrations, (registration) => {
      return registration.details.id === details.registrationId;
    });
    registration.preferences = _.sortBy(details.preferences, ['details.rank']);
  },
  [types.SET_SCOUTS] (state, scouts) {
    state.scouts = scouts;
  },
  [types.UPDATE_SCOUT] (state, updatedScout) {
    state.scouts = _.reject(state.scouts, (existingScout) => {
      return existingScout.id === updatedScout.id;
    });

    state.scouts.push(updatedScout);
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
          commit(types.ADD_REGISTRATION, response.data.registration);
          resolve(response.data.registration);
        })
        .catch((err) => {
          console.log('Failed to register', details.scoutId, 'for', details.eventId);
          reject();
        })
    });
  },
  addScout({ commit }, details) {
    return new Promise((resolve, reject) => {
      axios.post(URLS.USERS_URL + details.userId + '/scouts', details.scout)
        .then((response) => {
          console.log('Added scout', response.data.scout, 'for user', details.userId);
          commit(types.ADD_SCOUT, response.data.scout);
          resolve(response.data.scout);
        })
        .catch((err) => {
          console.log('Failed to create scout with error', err.response.data.message);
          reject(err.response.data.message);
        })
    });
  },
  deleteScout({ commit }, details) {
    return new Promise((resolve, reject) => {
      axios.delete(URLS.USERS_URL + details.userId + '/scouts/' + details.scoutId)
        .then((response) => {
          console.log('Deleted scout', details.scoutId, 'for user', details.userId);
          commit(types.DELETE_SCOUT, details.scoutId);
          resolve()
        })
        .catch((err) => {
          console.log('Failed to delete scout with error', err);
          reject();
        })
    });
  },
  getPreferences({ commit }, details) {
    return new Promise((resolve, reject) => {
      axios.get(URLS.SCOUTS_URL + details.scoutId + '/registrations/' +
                details.registrationId + '/preferences')
        .then((response) => {
          console.log('Received preferences', response.data);
          commit(types.SET_PREFERENCES, {
            scoutId: details.scoutId,
            registrationId: details.registrationId,
            preferences: response.data
          });
          resolve();
        })
        .catch((err) => {
          console.log('Failed to fetch preferences with', err);
          reject();
        })
    });
  },
  getScouts({ commit }, userId) {
    return new Promise((resolve, reject) => {
      axios.get(URLS.USERS_URL + userId + '/scouts/registrations')
        .then((response) => {
          console.log('Got scouts for user', userId, response.data);
          commit(types.SET_SCOUTS, response.data);
          resolve(response.data);
        })
        .catch((err) => {
          console.log('Failed to get scouts', err);
          reject();
        })
    });
  },
  setPreferences({ commit }, details) {
    return new Promise((resolve, reject) => {
      axios.post(URLS.SCOUTS_URL + details.scoutId + '/registrations/' +
                 details.registrationId + '/preferences', details.preferences)
        .then((response) => {
          console.log('Set preferences for registration', details.registrationId,
                      response.data.registration.preferences);
          commit(types.SET_PREFERENCES, {
            scoutId: details.scoutId,
            registrationId: details.registrationId,
            preferences: response.data.registration.preferences
          });
          resolve(response.data.registration.preferences);
        })
        .catch((err) => {
          console.log('Failed to set preferences', err);
          reject();
        })
    });
  },
  updateScout({ commit }, details) {
    return new Promise((resolve, reject) => {
      axios.put(URLS.USERS_URL + details.userId + '/scouts/' + details.scout.id, details.scout)
        .then((response) => {
          console.log('Updated scout', details.scout.id);
          commit(types.UPDATE_SCOUT, response.data.scout);
          resolve();
        })
        .catch((err) => {
          console.log('Failed to update scout', err);
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