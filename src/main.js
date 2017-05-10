import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import VuePaginate from 'vue-paginate'

import App from './App.vue';
import About from './components/About.vue';

import store from './store';
import routes from './router';
import components from './components';
import filters from './filters'

import './assets/sass/main.scss';

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(VuePaginate)

components(Vue);
filters(Vue);

export const router = new VueRouter({
  mode: 'history',
  routes: routes,
  base: __dirname
});

router.beforeEach((to, from, next) => {
  Promise.all([
    store.dispatch('getEvents'),
    store.dispatch('getCurrentEvent')
  ])
    .then(() => next())
    .catch(()=> next(false));
});

new Vue({
  router,
  store,
  el: '#app',
  components: { App }
});