import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';

import App from './App.vue';
import About from './components/About.vue';

import store from './store';
import routes from './router';
import components from './components';
import filters from './filters'

import './assets/sass/main.scss';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuelidate);

components(Vue);
filters(Vue);

export const router = new VueRouter({
  mode: 'history',
  routes: routes,
  base: __dirname
});

new Vue({
  router,
  store,
  el: '#app',
  components: { App }
});