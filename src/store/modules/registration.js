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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};