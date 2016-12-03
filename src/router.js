import About from './components/About.vue';
import Main from './components/Main.vue';
import NotFound from './components/NotFound.vue';
import EventList from './components/events/List.vue';
import Reset from './components/authentication/Reset.vue';
import Signup from './components/authentication/Signup.vue';
import EmailForm from './components/authentication/EmailForm.vue';
import ResetForm from './components/authentication/ResetForm.vue';
import Profile from './components/users/Profile.vue';
import UsersList from './components/users/List.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: Main
  }, {
    path: '/about',
    component: About
  }, {
    path: '/events',
    component: EventList
  }, {
    path: '/signup',
    component: Signup
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
    ]
  }, {
    path: '/profile/:id?',
    component: Profile
  }, {
    path: '/users',
    component: UsersList
  }, {
    path: '*',
    component: NotFound
  }
];