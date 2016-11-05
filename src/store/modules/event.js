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
  [types.DELETE_EVENT] (eventId) {
    _.remove(state.events, (event) => {
      return event.id === eventId;
    });
  },
  [types.GET_EVENTS] (state, events) {
    state.events = events;
  },
  [types.UPDATE_EVENT] (state, event) {
    let index = _.indexOf(state.events, { id: event.id });
    state.events.splice(index, 1, event);
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
          console.log('Created event', data.body.event)
          commit(types.ADD_EVENT, data.body.event);
          resolve(event);
        })
        .catch((err) => {
          console.log('Failed to create event', err.body.message);
          reject(err.body.message);
        });
    });
  },
  deleteEvent({ commit }, eventId) {
    return new Promise((resolve, reject) => {
      Vue.http.delete(URLS.EVENTS_URL + eventId)
        .then(() => {
          console.log('Deleted event', eventId);
          commit(types.DELETE_EVENT, eventId);
          resolve();
        })
        .catch(() => {
          console.log('Failed to delete event', eventId);
          reject();
        }); 
    })
  },
  getEvents({ commit }) {
    return new Promise((resolve, reject) => {
      Vue.http.get(URLS.EVENTS_URL)
        .then((data) => {
          console.log('Received events', data.body)
          commit(types.GET_EVENTS, data.body);
          resolve(event);
        })
    })
  },
  updateEvent({ commit }, eventUpdate) {
    return new Promise((resolve, reject) => {
      Vue.http.put(URLS.EVENTS_URL + eventUpdate.id, eventUpdate)
        .then((data) => {
          console.log('Updated event to', data.body.event);
          commit(types.UPDATE_EVENT, data.body.event);
          resolve(event);
        })
        .catch((err) => {
          console.log('Failed to update event', err.body.message);
          reject(err.body.message);
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