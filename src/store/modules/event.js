import * as types from '../mutation-types';

const state = {
  events: [],
  currentEvent: {}
};

const mutations = {
  [types.ADD_EVENT] (state, event) {
    state.events.push(event);
    state.eventError = false;
  }
};

export default {
  state,
  mutations
}