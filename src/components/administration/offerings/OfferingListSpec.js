import {
  shallow,
  createLocalVue
} from 'vue-test-utils';
import Vuex from 'vuex';

import OfferingList from './OfferingList.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe.only('OfferingList.vue', () => {
  let wrapper, getters, store;

  describe('when authenticated as an admin', () => {
    beforeEach(() => {
      getters = {
        badgeIdsAndNames: () => {
          return [{
              id: '1',
              name: 'Badge 1'
            },
            {
              id: '2',
              name: 'Badge 2'
            },
            {
              id: '3',
              name: 'Badge 3'
            }
          ]
        },
        offeringsForEvent: (eventId) => {
          return () => {
            return [{
              details: {
                badge_id: '1',
                  periods: [1, 2],
                  duration: 1,
                  requirements: ['1', '2'],
                  size_limit: 10
                }
              },
              {
                details: {
                  badge_id: '3',
                  periods: [2, 3],
                  duration: 2,
                  price: 10,
                  requirements: ['1a'],
                  size_limit: 20
                }
              }
            ]
          }
        }
      };

      store = new Vuex.Store({
        getters
      });

      wrapper = shallow(OfferingList, {
        localVue,
        store
      });
    });

    it('should compute a list of offered badges', () => {
      let expectedOfferings = [{
          badge_id: '1',
          name: 'Badge 1',
          periods: [1, 2],
          duration: 1,
          price: undefined,
          requirements: ['1', '2'],
          size_limit: 10
        },
        {
          badge_id: '2',
          name: 'Badge 2',
          periods: undefined,
          duration: undefined,
          price: undefined,
          requirements: undefined,
          size_limit: undefined
        },
        {
          badge_id: '3',
          name: 'Badge 3',
          periods: [2, 3],
          duration: 2,
          price: 10,
          requirements: ['1a'],
          size_limit: 20
        }
      ];

      expect(wrapper.vm.offeringList).to.deep.equal(expectedOfferings);
    });
  });
});
