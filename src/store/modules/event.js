import * as types from '../mutation-types';

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

export default {
  state,
  mutations
}