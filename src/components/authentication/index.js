import Login from './Login.vue';
import Signin from './Signin.vue';
import Signup from './Signup.vue';

export default function(Vue) {
  Vue.component('signup-form', Signup);
  Vue.component('login-form', Login);
  Vue.component('signin', Signin);
}