import axios from 'axios';

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
};

const actions = {
  addEvent({ commit }, event) {
    return new Promise((resolve, reject) => {
      axios.post(URLS.EVENTS_URL, event)
        .then((response) => {
          console.log('Created event', response.data.event)
          commit(types.ADD_EVENT, response.data.event);
          resolve(event);
        })
        .catch((err) => {
          console.log('Failed to create event', err.data.message);
          reject(err.data.message);
        });
    });
  },
  deleteEvent({ commit }, eventId) {
    return new Promise((resolve, reject) => {
      axios.delete(URLS.EVENTS_URL + eventId)
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
      axios.get(URLS.EVENTS_URL)
        .then((response) => {
          console.log('Received events', response.data)
          commit(types.GET_EVENTS, response.data);
          resolve(event);
        })
    })
  },
  updateEvent({ commit }, eventUpdate) {
    return new Promise((resolve, reject) => {
      axios.put(URLS.EVENTS_URL + eventUpdate.id, eventUpdate)
        .then((response) => {
          console.log('Updated event to', response.data.event);
          commit(types.UPDATE_EVENT, response.data.event);
          resolve(event);
        })
        .catch((err) => {
          console.log('Failed to update event', err.data.message);
          reject(err.data.message);
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