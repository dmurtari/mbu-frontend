import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import App from './App.vue';
import About from './components/About.vue';
import Signup from './components/Signup.vue';
import Login from './components/Login.vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Signin from './components/Signin.vue';

import auth from './auth';

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.component('signup-form', Signup);
Vue.component('login-form', Login);
Vue.component('signin', Signin);
Vue.component('navbar', Navbar);
Vue.component('mbu-footer', Footer);

auth.checkAuth();
Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

const routes = [
  {
    path: '/about',
    component: About
  }, {
    path: '/signin',
    component: Signin
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