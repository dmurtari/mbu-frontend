import axios from 'axios';
import _ from 'lodash';

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
  [types.DELETE_EVENT] (state, eventId) {
    _.remove(state.events, (event) => {
      return event.id === eventId;
    });
  },
  [types.GET_EVENTS] (state, events) {
    state.events = events;
  },
  [types.SET_CURRENT] (state, event) {
    state.currentEvent = event;
  },
  [types.UPDATE_EVENT] (state, event) {
    let index = _.indexOf(state.events, { id: event.id });
    state.events.splice(index, 1, event);
  }
};

const getters = {
  allEvents(state) {
    return state.events;
  },
  currentEvent(state) {
    return state.currentEvent;
  },
  currentEventIndex(state) {
    return _.findIndex(state.events, (event) => {
      event.id === state.currentEvent.id;
    });
  },
  orderedEvents(state) {
    return _.orderBy(state.events, 'date', 'desc');
  }
};

const actions = {
  addEvent({ commit }, event) {
    return new Promise((resolve, reject) => {
      axios.post(URLS.EVENTS_URL, event)
        .then((response) => {
          console.log('Created event', response.data.event)
          commit(types.ADD_EVENT, response.data.event);
          resolve(response.data.event);
        })
        .catch((err) => {
          console.log('Failed to create event', err.response.data.message);
          reject(err.response.data.message);
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
    });
  },
  getEvents({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(URLS.EVENTS_URL)
        .then((response) => {
          console.log('Received events', response.data);
          commit(types.GET_EVENTS, response.data);
          resolve();
        })
        .catch(() => {
          console.log('Failed to get events');
          reject();
        });
    });
  },
  getCurrentEvent({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(URLS.CURRENT_EVENT_URL)
        .then((response) => {
          console.log('Received current event', response.data);
          commit(types.SET_CURRENT, response.data);
          resolve(event);
        })
        .catch(() => {
          console.log('Failed to get current event');
          reject();
        })
    });
  },
  saveCurrentEvent({ commit }, eventId) {
    return new Promise((resolve, reject) => {
      axios.post(URLS.CURRENT_EVENT_URL, { id: eventId })
        .then((response) => {
          console.log('Updated current event to', eventId);
          commit(types.SET_CURRENT, response.data.currentEvent);
          resolve(response.data.currentEvent);
        })
        .catch((err) => {
          console.log('Failed to save current event', err.response.data.message);
          reject(err.response.data.message);
        });
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
          console.log('Failed to update event', err.response.data.message);
          reject(err.response.data.message);
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