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
  getRegistrations({ commit, state }, eventId) {
    if (_.find(state.registrations, { eventId: eventId })) {
      console.log('Registration exists');
      return;
    }

    return new Promise((resolve, reject) => {
      axios.get(URLS.EVENTS_URL + eventId + '/registrations')
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