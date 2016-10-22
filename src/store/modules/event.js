import * as types from '../mutation-types';

const state = {
  events: [],
  eventError: '',
  currentEvent: {}
};

const mutations = {
  [types.ADD_EVENT] (state, event) {
    state.events.push(event);
    state.eventError = false;
  },
  [types.ADD_EVENT_FAIL] (state) {
    state.eventError = true;
  },
  [types.CLEAR_ADD_EVENT_ERROR] (state) {
    state.eventError = false;
  }
};

export default {
  state,
  mutations
}