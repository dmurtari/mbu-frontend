import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import VuePaginate from 'vue-paginate';

import App from './App.vue';

import store from './store';
import routes from './router';
import components from './components';
import filters from './filters';

import './assets/sass/main.scss';
import '../node_modules/balloon-css/balloon.min.css';
import './assets/js/jasny-bootstrap.min.js';

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(VuePaginate);

components(Vue);
filters(Vue);

export const router = new VueRouter({
  mode: 'history',
  routes: routes
});

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token')) {
    return next();
  }

  if (to.meta.title) {
    document.title = to.meta.title;
  }

  return next();
});

new Vue({
  router,
  store,
  el: '#app',
  components: { App }
});
