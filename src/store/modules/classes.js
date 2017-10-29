import * as types from '../mutation-types';
import URLS from '../../urls';

import _ from 'lodash';
import Vue from 'vue';
import axios from 'axios';

const state = {
  eventClasses: {}
};

const getters = {
  eventClasses(state) {
    return state.eventClasses;
  }
};

const mutations = {
  [types.SET_CLASSES](state, details) {
    details.classes = _.map(details.classes, (classInfo) => {
      return {
        ...classInfo,
        sizeInfo: {}
      }
    });

    if (state.eventClasses[details.eventId]) {
      Vue.set(state.eventClasses[details.eventId], 'classes', details.classes);
    } else {
      state.eventClasses[details.eventId] = details;
    }
  },
  [types.SET_CLASS_SIZES](state, details) {
    let event = state.eventClasses[details.eventId];

    if (event == undefined) {
      return;
    }

    _.forEach(details.sizes, sizeInfo => {
      let selectedClass = _.find(event.classes, classInfo => {
        return classInfo.badge.badge_id === sizeInfo.badgeId;
      });

      Vue.set(selectedClass, 'sizeInfo', sizeInfo.sizeLimits);
    });
  }
};

const actions = {
  getClasses({ commit, dispatch, state }, eventId) {
    return new Promise((resolve, reject) => {
      return axios
        .get(URLS.EVENTS_URL + eventId + '/offerings/assignees')
        .then(response => {
          console.log('Received classes', response.data);
          commit(types.SET_CLASSES, {
            eventId: String(eventId),
            classes: response.data
          });

          dispatch('getClassSizes', {
            eventId: eventId,
            badgeIds: _.map(response.data, 'badge.badge_id')
          });

          resolve();
        })
        .catch(err => {
          console.error('Failed to get classes for event', eventId, err);
          reject();
        });
    });
  },
  getClassSizes({ commit }, details) {
    const requests = Promise.all(
      _.map(details.badgeIds, badgeId => {
        return axios.get(
          URLS.EVENTS_URL + details.eventId + '/badges/' + badgeId + '/limits'
        );
      })
    );

    return new Promise((resolve, reject) => {
      requests
        .then(responses => {
          const sizes = _.map(responses, (response, index) => {
            return {
              badgeId: details.badgeIds[index],
              sizeLimits: response.data
            };
          });

          console.log('Received class size information', sizes);

          commit(types.SET_CLASS_SIZES, {
            eventId: details.eventId,
            sizes: sizes
          });
          resolve(sizes);
        })
        .catch(err => {
          console.error('Failed to get class size limits', err);
          reject();
        });
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
