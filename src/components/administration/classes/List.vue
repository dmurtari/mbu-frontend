<template>
  <div>
    <h4 class="title is-4">
      Classes
    </h4>
    <p>
      These are the classes for an event based off of the badges that are being
      offered at an event and the scouts that are assigned to each period.
      <b>This page is for viewing scout assignments only</b>; to edit badges
      that are offered for an event, use the <router-link
      to="/administration/events/offerings">offerings page</router-link>.
      To change a scout's badge assignments, use the <router-link
      to="/administration/scouts/assignments">assignments page</router-link>.
    </p>
    <div class="box class-list-filters">
      <div class="columns">
        <div class="column is-6">
          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">For&nbsp;Event:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <events-dropdown @select="setEvent($event)"></events-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="search-container field is-horizontal">
            <div class="field-label">
              <label class="label" for="class-list-find">Badge:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control ">
                  <input class="input is-expanded"
                        id="class-list-find"
                        v-model="search"></input>
                </div>
              </div>
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
      <row-container v-for="offeredClass in filteredClass"
                     :key="offeredClass.offering_id"
                     :badge="offeredClass.badge.name"
                     :assignees="offeredClass.assignees"
                     :duration="offeredClass.duration"
                     :periods="offeredClass.periods"></row-container>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

import EventsDropdown from '../../shared/EventsDropdown.vue';
import RowContainer from './RowContainer.vue';

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
    RowContainer,
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