import axios from 'axios';
import _ from 'lodash';
import Vue from 'vue';

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
  [types.SET_ASSIGNMENT] (state, details) {

  },
  [types.SET_ASSIGNMENTS] (state, details) {
    let registrations = _.find(state.registrations, (registration) => {
      return registration.eventId === details.eventId;
    });

    let registration = _.find(registrations.registrations, (registration) => {
      return registration.registration_id === details.registrationId;
    });

    Vue.set(registration, 'assignments', details.assignments);
  },
  [types.SET_EVENT_REGISTRATIONS] (state, details) {
    state.registrations.push(details);
  }
};

const actions = {
  getRegistrations({ commit, state, rootState }, eventId) {
    let getURL;

    if (rootState.authentication.profile.role === 'coordinator') {
      getURL = URLS.USERS_URL + rootState.authentication.profile.id + '/events/'
        + eventId + '/registrations';
    } else {
      getURL = URLS.EVENTS_URL + eventId + '/registrations';
    }

    return new Promise((resolve, reject) => {
      axios.get(getURL)
        .then((response) => {
          console.log('Received registrations', response.data);
          commit(types.SET_EVENT_REGISTRATIONS, {
            eventId: eventId,
            registrations: response.data
          });
          resolve();
        })
        .catch((err) => {
          console.error('Failed to get registrations with', err);
          reject();
        });
    });
  },
  saveCompletions({ commit }, details) {
    return new Promise((resolve, reject) => {
      axios.put(URLS.SCOUTS_URL + details.scoutId + '/registrations/' +
        details.registrationId + '/assignments/' + details.offeringId, {
          completions: details.completions
        })
        .then((response) => {
          console.log('Updated assignment with completion', response.data);
          commit(types.SET_ASSIGNMENT, {
           })
          resolve(response.data);
        })
        .catch((err)=> {
          console.log('Failed to save completions', err);
          reject();
        })
    });
  },
  setAssignments({ commit }, details) {
    return new Promise((resolve, reject) => {
      axios.post(URLS.SCOUTS_URL + details.scoutId + '/registrations/' +
        details.registrationId + '/assignments', details.assignments)
        .then((response) => {
          console.log('Set assignments for registration', details.registrationId,
            response.data.registration.assignments);
          commit(types.SET_ASSIGNMENTS, {
            eventId: details.eventId,
            registrationId: details.registrationId,
            assignments: response.data.registration.assignments
          });
          resolve(response.data.registration.assignments);
        })
        .catch((err) => {
          console.error('Failed to set assignments', err);
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
