import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import App from './App.vue';
import About from './components/About.vue';

import auth from './services/auth';
import store from './store/store';
import routes from './router';

import authentication from './components/authentication';
import navigation from './components/navigation';
import events from './components/events';

Vue.use(VueResource);
Vue.use(VueRouter);

// Register components
authentication(Vue);
navigation(Vue);
events(Vue);

auth.checkAuth();
Vue.http.headers.common['Authorization'] = auth.getAuthHeader();

export const router = new VueRouter({
  routes: routes,
  base: __dirname
});

new Vue(
  Vue.util.extend(
    { router, store },
    App
  )
).$mount('#app');