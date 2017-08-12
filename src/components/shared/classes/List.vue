<template>
  <div>
    <p>
      This page shows the number of scouts assigned to each class. You can view the completion
      records for each scout in a class by clicking the "details" link next to each class.
      <span v-if="isAdmin"> To edit badges that are offered for an event, use the
        <router-link to="/administration/events/offerings">offerings page</router-link>. To change a scout's badge assignments, use the
        <router-link to="/administration/scouts/assignments">assignments page</router-link>.
      </span>
    </p>
    <div class="box class-list-filters">
      <div class="columns">
        <div class="column is-6">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
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
            <div class="field-label is-normal">
              <label class="label"
                     for="class-list-find">Badge:</label>
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
    <closable-error v-if="error"
                    @dismissed="dismissError()">{{ error }}</closable-error>
    <spinner-page v-if="loading"></spinner-page>
    <table v-else
           class="table is-striped">
      <thead>
        <tr>
          <th>Badge</th>
          <th>Duration</th>
          <th>Total</th>
          <th>Period 1</th>
          <th>Period 2</th>
          <th>Period 3</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <attendance-row v-for="offeredClass in filteredClass"
                        :key="offeredClass.offering_id"
                        :id="offeredClass.offering_id"
                        :eventId="eventId"
                        :badge="offeredClass.badge.name"
                        :scouts="offeredClass.assignees"
                        :duration="offeredClass.duration"></attendance-row>
      </tbody>
    </table>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

import AttendanceRow from './AttendanceRow.vue';

export default {
  data () {
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
      'eventClasses',
      'isAdmin'
    ]),
    event () {
      return _.find(this.allEvents, { 'id': this.eventId });
    },
    classes () {
      let event = _.find(this.eventClasses, { eventId: this.eventId }) || {};
      return event.classes;
    },
    orderedClasses () {
      return _.orderBy(this.classes, 'badge.name');
    },
    filteredClass () {
      return _.filter(this.orderedClasses, (classObject) => {
        return classObject.badge.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    }
  },
  methods: {
    dismissError () {
      this.error = '';
    },
    setEvent (eventId) {
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
    AttendanceRow
  }
}
</script>

<style lang="scss" scoped>
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
