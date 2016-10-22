import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';

Vue.use(Vuex);

const state = {
  events: [],
  eventState: '',
  currentEvent: {}
};

const mutations = {
  ADD_EVENT (state, event) {
    state.events.push(event);
    state.eventState = 'create_success';
  },
  ADD_EVENT_FAIL (state) {
    state.eventState = 'create_fail';
  }
};

export default new Vuex.Store({
  actions,
  state,
  mutations
});