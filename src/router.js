import About from './components/About.vue';
import EventList from './components/events/List.vue';
import Reset from './components/authentication/Reset.vue';

export default [
  {
    path: '/about',
    component: About
  }, {
    path: '/events',
    component: EventList
  }, {
    path: '/reset',
    component: Reset
  }
];