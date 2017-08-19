import store from 'store';

import About from 'components/About.vue';
import Main from 'components/Main.vue';
import NotFound from 'components/NotFound.vue';

import BadgeList from 'components/badges/List.vue';
import EventList from 'components/events/List.vue';

import Profile from 'components/users/profile/Profile.vue';

import EmailForm from 'components/authentication/EmailForm.vue';
import Reset from 'components/authentication/Reset.vue';
import ResetForm from 'components/authentication/ResetForm.vue';
import Login from 'components/authentication/Login.vue';
import Signup from 'components/authentication/Signup.vue';

import ClassList from 'components/shared/classes/List.vue';
import ClassDetail from 'components/shared/classes/ClassDetail.vue';
import ClassContainer from 'components/shared/classes/ClassContainer.vue';
import AttendanceList from 'components/shared/attendance/List.vue';

import Administration from 'components/administration/Administration.vue';
import AdministrationHome from 'components/administration/AdministrationHome.vue'
import AdminOfferings from 'components/administration/offerings/List.vue';
import AdminUsers from 'components/administration/users/List.vue';
import AdminApproval from 'components/administration/users/AwaitingApproval.vue';
import AdminPurchasables from 'components/administration/purchasables/List.vue';
import AdminScouts from 'components/administration/scouts/List.vue';
import AdminEvents from 'components/administration/events/EventsContainer.vue';
import AttendanceView from 'components/administration/attendance/AttendanceView.vue';
import ScoutContainer from 'components/administration/scouts/ScoutContainer.vue';
import ListAdmins from 'components/administration/users/admins/AdminUsersContainer.vue';
import CoordinatorDetail from 'components/administration/users/CoordinatorDetail.vue';
import UserContainer from 'components/administration/users/UserContainer.vue';

import ScoutDetails from 'components/scouts/ScoutDetail.vue';
import AttendanceDetails from 'components/stats/DetailView.vue';

import CoordinatorPage from 'components/coordinators/CoordinatorPage.vue';
import CoordinatorHome from 'components/coordinators/CoordinatorHome.vue';
import CoordinatorScouts from 'components/coordinators/scouts/List.vue';
import CoordinatorRegistration from 'components/coordinators/registrations/List.vue';
import CoordinatorAttendance from 'components/coordinators/attendance/List.vue';

import TeacherPage from 'components/teachers/TeacherPage.vue';
import TeacherHome from 'components/teachers/TeacherHome.vue';
import TeacherStats from 'components/teachers/stats/TeacherStats.vue';

import RegistrationTable from 'components/stats/RegistrationTable.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: Main,
    meta: { title: 'MBU Online | Home' }
  }, {
    path: '/about',
    component: About,
    meta: { title: 'MBU Online | About' }
  }, {
    path: '/administration',
    component: Administration,
    beforeEnter: requireRole('admin'),
    redirect: 'administration/home',
    children: [
      {
        path: 'home',
        component: AdministrationHome,
        meta: { title: 'MBU Online | Administration' }
      }, {
        path: 'users',
        component: {
          render(component) { return component('router-view') }
        },
        children: [
          {
            path: 'current',
            component: UserContainer,
            redirect: 'current/all',
            children: [
              {
                path: 'all',
                component: AdminUsers,
                meta: { title: 'MBU Online | Current Users' }
              }, {
                path: ':id',
                component: CoordinatorDetail,
                meta: { title: 'MBU Online | User Detail' }
              }
            ]
          }, {
            path: 'approval',
            component: AdminApproval,
            meta: { title: 'MBU Online | Users Needing Approval' }
          }, {
            path: 'admins',
            component: ListAdmins,
            meta: { title: 'MBU Online | Administrative Users' }
          }
        ]
      }, {
        path: 'scouts',
        component: {
          render(component) { return component('router-view') }
        },
        children: [
          {
            path: 'list',
            component: ScoutContainer,
            redirect: 'list/all',
            children: [
              {
                path: 'all',
                component: AdminScouts,
                meta: { title: 'MBU Online | All Scouts' }
              }, {
                path: ':id',
                component: ScoutDetails,
                meta: { title: 'MBU Online | Scout Detail' }
              }
            ]
          }, {
            path: 'assignments',
            component: AttendanceView,
            meta: { title: 'MBU Online | Assignments' },
            redirect: 'assignments/list',
            children: [
              {
                path: 'list',
                component: RegistrationTable,
              }, {
                path: 'detail',
                component: AttendanceList
              }
            ]
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
            component: AdminEvents,
            meta: { title: 'MBU Online | All Events' }
          }, {
            path: 'purchasables',
            component: AdminPurchasables,
            meta: { title: 'MBU Online | Items for Purchase' }
          }, {
            path: 'offerings',
            component: AdminOfferings,
            meta: { title: 'MBU Online | Class Offerings' }
          },
        ]
      }, {
        path: 'classes',
        component: ClassContainer,
        redirect: 'classes/all',
        children: [
          {
            path: 'all',
            component: ClassList,
            meta: { title: 'MBU Online | All Classes' }
          }, {
            path: ':eventId/:id',
            component: ClassDetail,
            meta: { title: 'MBU Online | Class Detail' },
            props(route) {
              return {
                offeringId: Number(route.params.id),
                eventId: Number(route.params.eventId)
              }
            }
          }
        ]
      }
    ]
  }, {
    path: '/coordinator',
    component: CoordinatorPage,
    beforeEnter: requireRole('coordinator'),
    redirect: 'coordinator/home',
    children: [
      {
        path: 'home',
        component: CoordinatorHome,
        meta: { title: 'MBU Online | Coordinator Home' }
      }, {
        path: 'scouts',
        component: CoordinatorScouts,
        meta: { title: 'MBU Online | Your Scouts' }
      }, {
        path: 'registrations',
        component: CoordinatorRegistration,
        meta: { title: 'MBU Online | Registrations' }
      }, {
        path: 'attendance',
        component: CoordinatorAttendance,
        redirect: 'attendance/list',
        children: [
          {
            path: 'detail',
            component: AttendanceDetails,
            meta: { title: 'MBU Online | Attendance Details' }
          }, {
            path: 'list',
            component: RegistrationTable,
            meta: { title: 'MBU Online | Attendance' }
          }
        ]
      }
    ]
  }, {
    path: '/teacher',
    component: TeacherPage,
    beforeEnter: requireRole('teacher'),
    redirect: '/teacher/home',
    children: [
      {
        path: 'home',
        component: TeacherHome,
        meta: { title: 'MBU Online | Instructor Home' }
      }, {
        path: 'assignments',
        component: AttendanceView,
        meta: { title: 'MBU Online | Statistics' },
        redirect: 'assignments/list',
        children: [
          {
            path: 'detail',
            component: AttendanceList,
          }, {
            path: 'list',
            component: RegistrationTable
          }
        ]
      }, {
        path: 'classes',
        component: ClassContainer,
        redirect: 'classes/all',
        children: [
          {
            path: 'all',
            component: ClassList,
            meta: { title: 'MBU Online | All Classes' }
          }, {
            path: ':eventId/:id',
            component: ClassDetail,
            meta: { title: 'MBU Online | Class Detail' },
            props(route) {
              return {
                offeringId: Number(route.params.id),
                eventId: Number(route.params.eventId)
              }
            }
          }
        ]
      }, {
        path: 'assignments',
        component: AttendanceList,
        meta: { title: 'MBU Online | Assignments' }
      }
    ]
  }, {
    path: '/events',
    component: EventList,
    meta: { title: 'MBU Online | Events' }
  }, {
    path: '/badges',
    component: BadgeList,
    meta: { title: 'MBU Online | Badges' }
  }, {
    path: '/signup',
    component: Signup,
    meta: { title: 'MBU Online | Sign Up' }
  }, {
    path: '/login',
    component: Login,
    meta: { title: 'MBU Online | Log In' }
  }, {
    path: '/reset',
    component: Reset,
    meta: { title: 'MBU Online | Reset Your Password' },
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
    component: Profile,
    meta: { title: 'MBU Online | Your Profile' }
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

function requireRole(role) {
  return function (to, from, next) {
    if (store.getters.role === undefined) {
      store.dispatch('getProfile')
        .then(() => {
          if ((store.getters.role === role || store.getters.isAdmin) && store.getters.isApproved) {
            next();
          } else {
            console.warn('Role is not allowed access to this resource');
            next(false);
          }
        })
        .catch(() => {
          next(false);
        });
    } else {
      if ((store.getters.role === role || store.getters.isAdmin) && store.getters.isApproved) {
        next();
      } else {
        console.warn('Role is not allowed access to this resource');
        next(false);
      }
    }
  }
}
