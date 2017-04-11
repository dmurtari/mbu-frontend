import * as types from '../mutation-types';
import URLS from '../../urls';

import Vue from 'vue';
import axios from 'axios';

const state = {
  eventClasses: []
};

const getters = {
  eventClasses(state) {
    return state.eventClasses;
  }
};

const mutations = {
  [types.SET_CLASSES] (state, details) {
    let index = _.findIndex(state.eventClasses, { eventId: details.eventId });

    if (index < 0) {
      state.eventClasses.push(details);
    } else {
      Vue.set(state.eventClasses[index], 'classes', details.classes);
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
            eventId: Number(eventId),
            classes: response.data
          });
          resolve();
        })
        .catch((err) => {
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