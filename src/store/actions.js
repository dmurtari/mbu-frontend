import Vue from 'vue';

import * as types from './mutation-types';
import URLS from '../urls';

export const addEvent = ({ commit }, event) => {
  return Vue.http.post(URLS.EVENTS_URL, event)
    .then((data) => {
      console.log('Created a new event', event);
      commit(types.ADD_EVENT, event);
    })
    .catch((err) => {
      console.log('Failed to create event', err.body.message);
      commit(types.ADD_EVENT_FAIL);
    });
}

export const clearError = ({commit}) => {
  commit(types.CLEAR_ADD_EVENT_ERROR);
}
