import axios from 'axios';
import _ from 'lodash';

import * as types from '../mutation-types';
import URLS from '../../urls';

const state = {
  scouts: []
};

const getters = {
  scouts(state) {
    return _.orderBy(state.scouts, 'lastname');
  }
};

const mutations = {

};

const actions = {

};

export default {
  state,
  getters,
  actions,
  mutations
};