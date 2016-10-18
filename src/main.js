import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import App from './App.vue';
import About from './components/About.vue';

import auth from './services/auth';
import store from './store/store';
import routes from './router';
import components from './components';

Vue.use(VueResource);
Vue.use(VueRouter);

components(Vue);
auth.checkAuth();
Vue.http.headers.common['Authorization'] = auth.getAuthHeader();

export const router = new VueRouter({
  routes: routes,
  base: __dirname
});

new Vue({
  router,
  store,
  el: '#app',
  components: { App }
});