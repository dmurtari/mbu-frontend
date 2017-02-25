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
import AdminOfferings from'./components/administration/offerings/List.vue';
import AdminUsers from './components/administration/users/List.vue';
import AdminPurchasables from './components/administration/purchasables/List.vue'
import AdminRegistrations from './components/administration/registrations/List.vue';

import CoordinatorPage from './components/coordinators/CoordinatorPage.vue';
import CoordinatorScouts from './components/coordinators/scouts/List.vue';
import CoordinatorRegistration from './components/coordinators/registrations/List.vue';

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
    component: Administration,
    children: [
      {
        path: 'offerings',
        component: AdminOfferings
      }, {
        path: 'users',
        component: AdminUsers
      }, {
        path: 'purchasables',
        component: AdminPurchasables
      }, {
        path: 'registrations',
        component: AdminRegistrations
      }
    ]
  }, {
    path: '/coordinator',
    component: CoordinatorPage,
    children: [
      {
        path: 'scouts',
        component: CoordinatorScouts
      }, {
        path: 'registrations',
        component: CoordinatorRegistration
      }
    ]
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