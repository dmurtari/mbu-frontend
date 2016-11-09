import About from './components/About.vue';
import Main from './components/Main.vue';
import EventList from './components/events/List.vue';
import Reset from './components/authentication/Reset.vue';
import EmailForm from './components/authentication/EmailForm.vue';
import ResetForm from './components/authentication/ResetForm.vue';

export default [
  {
    path: '/home',
    name: 'home',
    component: Main
  }, {
    path: '/about',
    component: About
  }, {
    path: '/events',
    component: EventList
  }, {
    path: '/reset',
    component: Reset,
    children: [
      {
        path: '',
        component: EmailForm
      }, {
        path: ':resetToken',
        component: ResetForm
      }
    ],
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next(false);
      }

      next();
    }
  }
];