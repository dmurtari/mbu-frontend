import Vue from 'vue'

import * as types from '../mutation-types';
import URLS from '../../urls';

const state = {
  events: [],
  currentEvent: {}
};

const mutations = {
  [types.ADD_EVENT] (state, event) {
    state.events.push(event);
  },
  [types.GET_EVENTS] (state, events) {
    state.events = events;
  }
};

const getters = {
  allEvents(state) {
    return state.events;
  }
}

const actions = {
  addEvent({ commit }, event) {
    return new Promise((resolve, reject) => {
      Vue.http.post(URLS.EVENTS_URL, event)
        .then((data) => {
          commit(types.ADD_EVENT, event);
          resolve(event);
        })
        .catch((err) => {
          console.log('Failed to create event', err.body.message);
          reject(err.body.message);
        });
    });
  },
  getEvents({ commit }) {
    return new Promise((resolve, reject) => {
      Vue.http.get(URLS.EVENTS_URL)
        .then((data) => {
          console.log('Received', data.body)
          commit(types.GET_EVENTS, data.body);
          resolve(event);
        })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}