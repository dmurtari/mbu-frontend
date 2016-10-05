import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import App from './App.vue';
import About from './components/About.vue';

Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
  {
    path: '/about',
    component: About
  }
];

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
