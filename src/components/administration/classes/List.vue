<template>
  <div>
    <h4 class="title is-4">
      Classes
    </h4>
    <p>

    </p>
    <div class="notification is-danger" v-if="error">
      <button class="delete" @click.prevent="dismissError()"></button>
      <p>
        {{ error }}
      </p>
    </div>
    <div class="box class-list-filters">
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
      </div>
    </div>
    <loader v-if="loading" :color="'lightgray'" class="class-loading"></loader>
    <div class="class-list"
         v-if="!loading">
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
      eventId: 1,
      loading: false,
    };
  },
  computed: {
    ...mapGetters([
      'allEvents'
    ]),
    event() {
      return _.find(this.allEvents, { 'id': this.eventId });
    },
  },
  methods: {
    dismissError() {
      this.error = '';
    },
    setEvent(eventId) {
      this.eventId = eventId;
      this.loading = true;
      this.$store.dispatch('getClasses', eventId)
        .then(() => {
          this.loading = false;
          this.error = '';
        })
        .catch(() => {
          this.loading = false;
          this.error = 'Failed to get classes for this event';
        });
    }
  },
  components: {
    EventsDropdown
  }
}
</script>

<style lang="sass" scoped>
  .class-list-filters {
    margin-top: 2em;
  }

  .class-loading {
    margin-top: 5em;
    width: 5em;
    display: block;
    margin: auto;
  }
</style>