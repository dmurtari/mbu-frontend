import Vue from 'vue';

import * as types from './mutation-types';
import URLS from '../urls';

export const addEvent = ({ commit }, event) => {
  return new Promise((resolve, reject) => {
    Vue.http.post(URLS.EVENTS_URL, event)
      .then((data) => {
        commit(types.ADD_EVENT, event);
        resolve(event);
      })
      .catch((err) => {
        console.log('Failed to create event', err.body.message);
        reject(err.body.message);
      });
  });
}

export const clearError = ({commit}) => {
  commit(types.CLEAR_ADD_EVENT_ERROR);
}
