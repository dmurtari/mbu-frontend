import About from './components/About.vue';
import Main from './components/Main.vue';
import NotFound from './components/NotFound.vue';

import BadgeList from './components/badges/List.vue';
import EventList from './components/events/List.vue';
import OfferingList from './components/offerings/List.vue';

import Profile from './components/users/profile/Profile.vue';
import UsersList from './components/users/list/List.vue';

import ScoutsList from './components/scouts/List.vue';

import EmailForm from './components/authentication/EmailForm.vue';
import Reset from './components/authentication/Reset.vue';
import ResetForm from './components/authentication/ResetForm.vue';
import Login from './components/authentication/Login.vue';
import Signup from './components/authentication/Signup.vue';

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
    path: '/badges',
    component: BadgeList
  }, {
    path: '/offerings',
    component: OfferingList
  }, {
    path: '/signup',
    component: Signup
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/scouts',
    component: ScoutsList
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