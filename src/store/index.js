import Vue from 'vue';
import Vuex from 'vuex';

import * as actions from './actions';
import * as getters from './getters';

import event from './modules/event';
Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    event
  }
});