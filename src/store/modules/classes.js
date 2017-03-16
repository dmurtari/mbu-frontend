import * as types from '../mutation-types';
import URLS from '../../urls';

import axios from 'axios';

const state = {
  eventClasses: []
};

const getters = {};

const mutations = {
  [types.SET_CLASSES] (state, details) {
    if (_.find(state.eventClasses, { eventId: details.eventId})) {
      return;
    } else {
      state.eventClasses.push(details);
    }
  }
};

const actions = {
  getClasses({ commit }, eventId) {
    return new Promise((resolve, reject) => {
      return axios.get(URLS.EVENTS_URL + eventId + '/offerings/assignees')
        .then((response) => {
          console.log('Received classes', response.data);
          commit(types.SET_CLASSES, {
            eventId: eventId,
            classes: response.data
          });
          resolve();
        })
        .catch((reject) => {
          console.error('Failed to get classes for event', eventId, err);
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