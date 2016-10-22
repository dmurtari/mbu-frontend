import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';

Vue.use(Vuex);

const state = {
  events: [],
  eventError: '',
  currentEvent: {}
};

const mutations = {
  ADD_EVENT (state, event) {
    state.events.push(event);
    state.eventError = false;
  },
  ADD_EVENT_FAIL (state) {
    state.eventError = true;
  },
  CLEAR_EVENT_ERROR (state) {
    state.eventError = false;
  }
};

export default new Vuex.Store({
  actions,
  state,
  mutations
});