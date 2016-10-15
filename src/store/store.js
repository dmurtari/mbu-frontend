import Vue from 'vue';
import Vuex from 'vuex';

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
  state,
  mutations
});