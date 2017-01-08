import axios from 'axios';
import _ from 'lodash';

import * as types from '../mutation-types';
import URLS from '../../urls';

const state = {
  eventId: {},
  offerings: []
};

const getters = {
  offerings(state) {
    return state.offerings;
  }
};

const mutations = {
  [types.SET_OFFERINGS] (state, event) {
    state.offerings = _.map(event.offerings, 'details');
    state.eventId = event.id;
  },
  [types.DELETE_OFFERING] (state, details) {
    if (state.event === details.eventId) {
      _.remove(state.offerings, (offering) => {
        return offering.badge
      })
    }
  },
  [types.UPDATE_OFFERING] (state, offering) {
    let index = _.indexOf(state.offerings, { badge_id: offering.badge_id });
    state.offerings.splice(index, 1, offering);
  }
};

const actions = {  
  createOffering({ commit }, offering) {
    return new Promise((resolve, reject) => {
      axios.post(URLS.EVENTS_URL + offering.eventId + '/badges', offering.details)
        .then((response) => {
          console.log('Created offering', offering.details, 'for event', offering.eventId);
          commit(types.SET_OFFERINGS, response.data.event);
          resolve();
        })
        .catch((err) => {
          console.log('Failed to create offering', offering.details);
          reject(err.response.data.message);
        });
    });
  },
  deleteOffering({ commit }, details) {
    return new Promise((resolve, reject) => {
      axios.delete(URLS.EVENTS_URL + details.eventId + '/badges/' + details.badgeId)
        .then((response) => {
          console.log('Deleted badge', details.badgeId, 'from event', details.eventId);
          commit(types.DELETE_OFFERING, details);
          resolve();
        })
        .catch(() => {
          console.log('Failed to delete offering', details.badgeId);
          reject();
        });
    });
  },
  getOfferings({ commit }, eventId) {
    return new Promise((resolve, reject) => {
      axios.get(URLS.EVENTS_URL + '?id=' + eventId)
        .then((response) => {
          console.log('Received event', response.data[0]);
          commit(types.SET_OFFERINGS, response.data[0]);
          resolve();
        })
        .catch(() => {
          console.log('Failed to get event offerings');
          reject();
        });
    }); 
  },
  updateOffering({ commit }, details) {
    return new Promise((resolve, reject) => {
      axios.put(URLS.EVENTS_URL + details.eventId + '/badges/' + details.badgeId, details.offering)
        .then((response) => {
          console.log('Updated offering for badge', details.badgeId);
          commit(types.UPDATE_OFFERING, response.data.offering);
          resolve()
        })
        .catch(() => {
          console.log('Failed to update offering');
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
}