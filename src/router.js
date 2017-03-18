import store from './store';

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
import AdministrationHome from './components/administration/AdministrationHome.vue'
import AdminOfferings from './components/administration/offerings/List.vue';
import AdminUsers from './components/administration/users/List.vue';
import AdminApproval from './components/administration/users/AwaitingApproval.vue';
import AdminPurchasables from './components/administration/purchasables/List.vue';
import AdminAttendance from './components/administration/attendance/List.vue';
import AdminClasses from './components/administration/classes/List.vue';

import CoordinatorPage from './components/coordinators/CoordinatorPage.vue';
import CoordinatorHome from './components/coordinators/CoordinatorHome.vue';
import CoordinatorScouts from './components/coordinators/scouts/List.vue';
import CoordinatorRegistration from './components/coordinators/registrations/List.vue';
import CoordinatorAttendance from './components/coordinators/attendance/List.vue';

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
    beforeEnter: requireApproval,
    children: [
      {
        path: 'home',
        component: AdministrationHome
      }, {
        path: 'users',
        beforeEnter(to, from, next) {
          store.dispatch('getUsers')
            .then(() => next())
            .catch(() => next({ path: '/administration' }));
        },
        component: {
          render(component) { return component('router-view') }
        },
        children: [
          {
            path: 'current',
            component: AdminUsers
          }, {
            path: 'approval',
            component: AdminApproval
          }
        ]
      }, {
        path: 'scouts',
        component: {
          render(component) { return component('router-view') }
        },
        children: [
          {
            path: 'assignments',
            component: AdminAttendance
          }
        ]
      }, {
        path: 'events',
        component: {
          render(component) { return component('router-view') }
        },
        children: [
          {
            path: 'all',
            component: EventList
          }, {
            path: 'purchasables',
            component: AdminPurchasables
          }, {
            path: 'offerings',
            component: AdminOfferings
          },
        ]
      }, {
        path: 'classes',
        component: AdminClasses
      }
    ]
  }, {
    path: '/coordinator',
    component: CoordinatorPage,
    beforeEnter: requireApproval,
    children: [
      {
        path: 'home',
        component: CoordinatorHome
      }, {
        path: 'scouts',
        component: CoordinatorScouts
      }, {
        path: 'registrations',
        component: CoordinatorRegistration
      }, {
        path: 'attendance',
        component: CoordinatorAttendance
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

function requireApproval(to, from, next) {
  if (store.getters.isApproved === undefined) {
    store.dispatch('getProfile')
      .then(() => {
        if (!store.getters.isApproved) {
          next(false);
        } else {
          next();
        }
      })
      .catch(() => {
        next(false);
      });
  } else {
    if (!store.getters.isApproved) {
      next(false);
    } else {
      next();
    }
  }
}