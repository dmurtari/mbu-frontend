import Vue from 'vue';
import PurchasedItem from './PurchasedItem.vue';
import Vuex from 'vuex';
import {
  mount
} from 'avoriaz';

import filters from 'filters';

Vue.use(Vuex);
filters(Vue);

const selectors = {
  deleteButton: '#delete-purchased-item',
  deleteError: '#delete-warning'
};

const propsData = {
  item: {
    id: 1,
    price: 10,
    item: 'Test Item',
    details: {
      size: 's',
      quantity: 2
    }
  },
  registrationId: 1,
  scoutId: 2
}

describe('PurchasedItem.vue', () => {
  let wrapper, store, actions;

  beforeEach(() => {
    actions = {
      deletePurchase: sinon.stub()
    };

    store = new Vuex.Store({
      actions
    });
  });

  describe('when created with an item', () => {
    beforeEach(() => {
      wrapper = mount(PurchasedItem, {
        store,
        propsData
      });
    });

    it('should display the item', () => {
      expect(wrapper.text()).to.contain('Test Item');
    });

    it('should show the item size', () => {
      expect(wrapper.text()).to.contain('S');
    });

    it('should show the total item price', () => {
      expect(wrapper.text()).to.contain('$20.00');
    });

    it('should have a delete button', () => {
      expect(wrapper.find(selectors.deleteButton)).to.have.lengthOf(1);
    });

    it('should not have an error', () => {
      expect(wrapper.data().error).to.equal('');
      expect(wrapper.find(selectors.deleteError)).to.have.lengthOf(0);
    });

    describe('and clicking the delete button', () => {
      beforeEach(() => {
        const button = wrapper.find(selectors.deleteButton)[0];
        button.trigger('click');
      });

      it('should set the deleting property', () => {
        expect(wrapper.data().deleting).to.be.true;
      });

      it('should trigger the vuex delete method', () => {
        expect(actions.deletePurchase).to.have.been.calledWith(sinon.match.any, {
          purchasableId: 1,
          registrationId: 1,
          scoutId: 2
        });
      });
    });
  });

  describe('a successful delete', () => {
    beforeEach(() => {
      actions = {
        deletePurchase: sinon.stub().resolves()
      };

      store = new Vuex.Store({
        actions
      });

      wrapper = mount(PurchasedItem, {
        store,
        propsData
      });

      const button = wrapper.find(selectors.deleteButton)[0];
      button.trigger('click');
    });

    it('should not set an error', () => {
      actions.deletePurchase().then(() => {
        expect(wrapper.data().error).to.equal('');
      });
    });

    it('should know that it is done deleting', () => {
      actions.deletePurchase().then(() => {
        expect(wrapper.data().deleting).to.be.false;
      });
    });
  });

  describe('a failed delete', () => {
    beforeEach(() => {
      actions = {
        deletePurchase: sinon.stub().rejects()
      };

      store = new Vuex.Store({
        actions,
        propsData
      });

      wrapper = mount(PurchasedItem, {
        store,
        propsData
      });

      const button = wrapper.find(selectors.deleteButton)[0];
      button.trigger('click');
    });

    it('should set an error', () => {
      actions.deletePurchase().catch(() => {
        expect(wrapper.data().error).to.have.length.greaterThan(1);
      });
    });

    it('should know that it is done deleting', () => {
      actions.deletePurchase().catch(() => {
        expect(wrapper.data().deleting).to.be.false;
      });
    });
  });
});
