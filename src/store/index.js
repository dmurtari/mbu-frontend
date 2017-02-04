import Vue from 'vue';
import Vuex from 'vuex';

import authentication from './modules/authentication'
import badges from './modules/badge';
import event from './modules/event';
import scouts from './modules/scout';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    badges,
    event,
    scouts,
    users
  }
});