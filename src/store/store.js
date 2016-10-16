import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';

Vue.use(Vuex);

const state = {
  events: [],
  currentEvent: {}
};

const mutations = {
  ADD_EVENT (state, event) {
    state.events.push(event);
  }
};

export default new Vuex.Store({
  actions,
  state,
  mutations
});