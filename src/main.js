import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import About from './About.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/about',
    component: About
  }
];

const router = new VueRouter({
  routes: routes,
  base: __dirname
});

new Vue(
  Vue.util.extend(
    { router },
    App
  )
).$mount('#app');

