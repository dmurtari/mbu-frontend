import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import App from './App.vue';
import About from './components/About.vue';

import auth from './services/auth';
import store from './store';
import routes from './router';
import components from './components';
import filters from './filters'

Vue.use(VueResource);
Vue.use(VueRouter);

components(Vue);
filters(Vue);

auth.checkAuth();
Vue.http.headers.common['Authorization'] = auth.getAuthHeader();

export const router = new VueRouter({
  routes: routes,
  base: __dirname
});

console.log('using filters', filters)

new Vue({
  router,
  store,
  el: '#app',
  components: { App }
});