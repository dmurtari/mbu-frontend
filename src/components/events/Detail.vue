<template>
  <div>
    <div>
      <p><strong>Date:</strong> {{ event.date | longDate }}</p>
      <p><strong>Registration Fee:</strong> ${{ event.price }}</p>
      <p><strong>Registration Open:</strong> {{ event.registration_open | longDate }}</p>
      <p><strong>Registration Close:</strong> {{ event.registration_close | longDate }}</p>
    </div>
    <br>
    <h5 class="title is-5">Badges offered at this event:</h5>
    <div v-if="orderedOfferings.length > 0">
      <div v-for="offering in orderedOfferings">
        {{ offering.name }}
      </div>
    </div>
    <div v-else>
      No badges are listed as available at this event.
      <span v-if="isAdmin">
        Offer badges for this event at the
        <router-link to="/administration">offerings page</router-link>.
      </span>
      <span v-if="!isAdmin">
        Please check with the event coordinators if you feel this is not correct.
      </span>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';

export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'isAdmin'
    ]),
    orderedOfferings() {
      return _.orderBy(this.event.offerings, 'name');
    }
  }
}
</script>