import Vue from 'vue';

import URLS from '../urls';

export const addEvent = ({ commit }, event) => {
  Vue.http.post(URLS.EVENTS_URL, event).then((data) => {
    console.log('Created a new event', event)
    commit('ADD_EVENT', event);
  }, (err) => {
    console.log('Failed to create event', err.body.message)
    commit('ADD_EVENT_FAIL')
  });
}
