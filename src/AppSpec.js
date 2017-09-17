import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import {
  mount
} from 'avoriaz';

Vue.use(Vuex);

describe('App component', () => {
  let wrapper, store, getters;

  describe('when not authenticated', () => {
    beforeEach(() => {
      getters = {
        isApproved: () => null
      };

      store = new Vuex.Store({
        getters
      });

      wrapper = mount(App, {
        store
      });

      wrapper.setData({ loading: false });
    });

    it('should not display a notification', () => {
      expect(wrapper.find('.notification')).to.have.lengthOf(0);
    });
  });

  describe('when authenticated', () => {
    describe('and not approved', () => {
      beforeEach(() => {
        getters = {
          isApproved: () => false
        };

        let actions = {
          getProfile: sinon.stub().resolves()
        }

        store = new Vuex.Store({
          getters, actions
        });

        wrapper = mount(App, {
          store
        });

        wrapper.setData({ loading: false });
      });

      it('should show a notification', () => {
        expect(wrapper.find('.notification')).to.have.lengthOf(1);
      });
    });

    describe('and approved', () => {
      beforeEach(() => {
        getters = {
          isApproved: () => true
        };

        store = new Vuex.Store({
          getters
        });

        wrapper = mount(App, {
          store
        });

        wrapper.setData({ loading: false });
      });

      it('should not show a notification', () => {
        expect(wrapper.find('.notification')).to.have.lengthOf(0);
      });
    });
  });
});
