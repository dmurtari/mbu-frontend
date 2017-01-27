<template>
  <div>
    <h4 class="title is-4">Troop Registrations</h4>
    <p>
      Use this page to manage event registrations for your troop.
    </p>
    <div class="notification is-danger" v-if="error">
      <button class="delete" @click.prevent="dismissError()"></button>
      <p>{{ error }}</p>
    </div>
    <div class="box offering-list-filters">
      <div class="columns">
        <div class="column is-6">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">For&nbsp;Event:</label>
            </div>
            <div class="control">
              <events-dropdown @select="setEvent($event)"></events-dropdown>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label" for="offering-list-offered-filter">Filter&nbsp;by:</label>
            </div>
            <div class="control">
              <span class="select">
                <select class="form-control"
                        id="offering-list-offered-filter"
                        v-model="registrationFilter">
                  <option v-for="option in registrationFilters" :value="option.value">
                    {{ option.text }}
                  </option>
                </select>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import EventsDropdown from '../../shared/EventsDropdown.vue';

export default {
  data() {
    return {
      error: '',
      loading: false,
      registrationFilter: 'all',
      registrationFilters: [
        { text: 'All', value: 'all' },
        { text: 'Attending Event', value: 'attending' },
        { text: 'Not Attending Event', value: 'not_attending' }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'profile'
    ])
  },
  methods: {
    dismissError() {
      this.error = '';
    },
    setEvent(eventId) {
      console.log('Piced', eventId);
    }
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch('getRegistrations', this.profile.id)
      .then((registrations) => {
        this.loading = false
      })
      .catch(() => {
        this.error = 'Unable to get registrations. Please refresh and try again.';
      });
  },
  components: {
    'events-dropdown': EventsDropdown
  }
}
</script>

<style lang="sass" scoped>
  .registration-list-filters {
    margin-top: 2em;
  }
</style>