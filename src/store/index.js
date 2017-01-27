import Vue from 'vue';
import Vuex from 'vuex';

import authentication from './modules/authentication'
import badges from './modules/badge';
import event from './modules/event';
import offerings from './modules/offerings';
import registration from './modules/registration';
import scouts from './modules/scout';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    badges,
    event,
    offerings,
    registration,
    scouts,
    users
  }
});