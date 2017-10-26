import * as types from '../mutation-types';
import URLS from '../../urls';

import Vue from 'vue';
import axios from 'axios';

const state = {
  eventClasses: {}
};

const getters = {
  eventClasses(state) {
    return state.eventClasses;
  }
};

const mutations = {
  [types.SET_CLASSES](state, details) {
    if (state.eventClasses[details.eventId]) {
      Vue.set(state.eventClasses[details.eventId], 'classes', details.classes);
    } else {
      state.eventClasses[details.eventId] = details
    }
  },
  [types.SET_CLASS_SIZES](state, details) {}
};

const actions = {
  getClasses({ commit }, eventId) {
    return new Promise((resolve, reject) => {
      return axios
        .get(URLS.EVENTS_URL + eventId + '/offerings/assignees')
        .then(response => {
          console.log('Received classes', response.data);
          commit(types.SET_CLASSES, {
            eventId: Number(eventId),
            classes: response.data
          });
          resolve();
        })
        .catch(err => {
          console.error('Failed to get classes for event', eventId, err);
          reject();
        });
    });
  },
  getClassSize({ commit }, details) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          URLS.EVENTS_URL +
            details.eventId +
            '/badges/' +
            details.badgeId +
            '/limits'
        )
        .then(response => {
          console.log('Received class size information', response.data);
          commit();
          resolve(response.data);
        })
        .catch(err => {
          console.error('Failed to get class size limits', err);
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
