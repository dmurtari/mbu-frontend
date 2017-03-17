<template>
  <div>
    <h4 class="title is-4">
      Classes
    </h4>
    <p>
      These are the classes for an event based off of the badges that are being
      offered at an event and the scouts that are assigned for each period.
    </p>
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
        <div class="column is-6">
          <div class="search-container control is-horizontal">
            <div class="control-label">
              <label class="label" for="class-list-find">Search:</label>
            </div>
            <div class="control has-addons">
              <input class="input is-expanded"
                     id="class-list-find"
                     v-model="search"></input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="notification is-danger" v-if="error">
      <button class="delete" @click.prevent="dismissError()"></button>
      <p>
        {{ error }}
      </p>
    </div>
    <loader v-if="loading" :color="'lightgray'" class="class-loading"></loader>
    <div class="class-list"
         v-if="!loading">
    </div>
    <div>
      <class-row v-for="offeredClass in filteredClass"
                 :key="offeredClass.offering_id"
                 :badge="offeredClass.badge.name"
                 :assignees="offeredClass.assignees"
                 :duration="offeredClass.duration"
                 :periods="offeredClass.periods"></class-row>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

import EventsDropdown from '../../shared/EventsDropdown.vue';
import ClassRow from './ClassRow.vue';

export default {
  data() {
    return {
      error: '',
      eventId: 1,
      loading: false,
      search: ''
    };
  },
  computed: {
    ...mapGetters([
      'allEvents',
      'eventClasses'
    ]),
    event() {
      return _.find(this.allEvents, { 'id': this.eventId });
    },
    classes() {
      let event =  _.find(this.eventClasses, { eventId: this.eventId }) || {};
      return event.classes;
    },
    orderedClasses() {
      return _.orderBy(this.classes, 'badge.name');
    },
    filteredClass() {
      return _.filter(this.orderedClasses, (classObject) => {
        return classObject.badge.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    }
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
    ClassRow,
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