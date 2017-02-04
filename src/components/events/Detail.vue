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
    <div v-if="orderedOfferings.length > 0" class="offering-list">
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

<style lang="sass" scoped>
  @media screen and (min-width: 700px) {
    .offering-list {
      columns: 3
    }
  }

  @media screen and (max-width: 699px) and (min-width: 500px) {
    .offering-list {
      columns: 2
    }
  }

  @media screen and (max-width: 499) {
    .offering-list {
      columns: 1
    }
  }
</style>