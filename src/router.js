import About from './components/About.vue';
import Main from './components/Main.vue';
import NotFound from './components/NotFound.vue';

import BadgeList from './components/badges/List.vue';
import EventList from './components/events/List.vue';

import Profile from './components/users/profile/Profile.vue';

import EmailForm from './components/authentication/EmailForm.vue';
import Reset from './components/authentication/Reset.vue';
import ResetForm from './components/authentication/ResetForm.vue';
import Login from './components/authentication/Login.vue';
import Signup from './components/authentication/Signup.vue';

import Administration from './components/administration/Administration.vue';
import CoordinatorPage from './components/coordinators/CoordinatorPage.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: Main
  }, {
    path: '/about',
    component: About
  }, {
    path: '/administration',
    component: Administration
  }, {
    path: '/coordinator',
    component: CoordinatorPage
  }, {
    path: '/events',
    component: EventList
  }, {
    path: '/badges',
    component: BadgeList
  }, {
    path: '/signup',
    component: Signup
  }, {
    path: '/login',
    component: Login
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
    path: '*',
    component: NotFound
  }
];