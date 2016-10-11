import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import App from './App.vue';
import About from './components/About.vue';

import auth from './auth';
import routes from './router';
import authentication from './components/authentication';
import navigation from './components/navigation';

Vue.use(VueResource);
Vue.use(VueRouter);

// Register components
authentication(Vue);
navigation(Vue);

auth.checkAuth();
Vue.http.headers.common['Authorization'] = auth.getAuthHeader();

export const router = new VueRouter({
  routes: routes,
  base: __dirname
});

new Vue(
  Vue.util.extend(
    { router },
    App
  )
).$mount('#app');