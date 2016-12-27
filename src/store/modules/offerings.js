import axios from 'axios';
import _ from 'lodash';

import * as types from '../mutation-types';
import URLS from '../../urls';

const state = {
  event: {},
  offerings: []
};

const getters = {
  offerings(state) {
    return {
      eventId: event,
      offerings: offerings
    };
  }
};

const mutations = {
  [types.SET_OFFERINGS] (state, event) {
    state.offerings = _.map(event.offerings, 'details');
    state.event = event.id;
  }
};

const actions = {  
  createOffering({ commit }, offering) {
    return new Promise((resolve, reject) => {
      axios.post(URLS.EVENTS_URL + offering.eventId + '/badges', offering.details)
        .then((response) => {
          console.log('Created offering', offering.details, 'for event', eventId);
          commit(types.SET_OFFERINGS, response.data.event);
          resolve();
        })
        .catch((err) => {
          console.log('Failed to create offering', offering.details);
          reject(err.response.data.message);
        });
    });
  },
  getOfferings({ commit }, eventId) {
    return new Promise((resolve, reject) => {
      axios.get(URLS.EVENTS_URL + '?id=' + eventId)
        .then((response) => {
          console.log('Received event', response.data[0]);
          commit(types.SET_OFFERINGS, response.data[0]);
          resolve();
        })
        .catch(() => {
          console.log('Failed to get event offerings');
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
}