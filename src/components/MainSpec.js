import 'babel-polyfill';

import Vue from 'vue';
import Main from './Main.vue';
import Vuex from 'vuex';
import {
  mount
} from 'avoriaz';

Vue.use(Vuex);

describe('Main', () => {
  let wrapper, store, getters;

  describe('when logged out', () => {
    beforeEach(() => {
      getters = {
        isAuthenticated: () => true,
        isTeacher: () => false,
        isCoordinator: () => false,
        isAdmin: () => false,
        currentEvent: () => {
          return {
            semester: 'Fall',
            year: '2017'
          }
        }
      };

      store = new Vuex.Store({
        getters
      });
      wrapper = mount(Main, {
        store
      });
    });

    it('should show a welcome message', () => {
      expect(wrapper.find('#genericWelcome')).to.have.lengthOf(1);
    });

    it('should show a signup link', () => {
      expect(wrapper.text()).to.contain('signup');
    });

    it('should show a login link', () => {
      expect(wrapper.text()).to.contain('Login');
    });

    it('should not show the admin welcome', () => {
      expect(wrapper.find('#adminWelcome')).to.have.lengthOf(0);
    });

    it('should not show the teacher welcome', () => {
      expect(wrapper.find('#teacherWelcome')).to.have.lengthOf(0);
    });

    it('should not show the coordinator welcome', () => {
      expect(wrapper.find('#coordinatorWelcome')).to.have.lengthOf(0);
    });
  });
});
