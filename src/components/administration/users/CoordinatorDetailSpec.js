import { shallow, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import CoordinatorDetail from './CoordinatorDetail.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('CoordinatorDetail.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(CoordinatorDetail, {
      localVue,
      propsData: {
        id: 1
      }
    });

    wrapper.vm.loading = false;
    wrapper.vm.user = {};
  });

  it('should exist', () => {
    expect(wrapper.isVueInstance()).to.be.true;
  });

  it('should not show the edit form', () => {
    expect(wrapper.vm.editing).to.be.false;
    expect(wrapper.findAll('edit-profile')).to.have.lengthOf(0);
  });
});
