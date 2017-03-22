<template>
  <div>
    <h4 class="title is-4">All Scouts</h4>
    <p>
      This is a list of all scouts that have ever been registered for MBU
      Online.
    </p>
    <div class="notification is-danger" v-if="error">
      <button class="delete" @click.prevent="dismissError()"></button>
      <p>
        {{ error }}
      </p>
    </div>
    <div class="box scout-list-filters">
      <div class="columns is-multiline">
        <div class="column is-6">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Registered:</label>
            </div>
            <div class="control">
              <events-dropdown :showAll="true"
                               @select="pickEvent($event)"></events-dropdown>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Troop:</label>
            </div>
            <div class="control">
              <span class="input-group select">
                <select class="input"
                        v-model="troopFilter">
                  <option :value="null">All Troops</option>
                  <option v-for="troop in troops" :value="troop" :key="troop">
                    {{ troop }}
                  </option>
                </select>
              </span>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="search-container control is-horizontal">
            <div class="control-label">
              <label class="label" for="scout-list-find">Name:</label>
            </div>
            <div class="control">
              <input class="input is-expanded"
                     id="scout-list-find"
                     v-model="search"></input>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <button class="button is-pulled-right"
                  @click.prevent="reset()">Reset Filters</button>
        </div>
      </div>
    </div>
    <table class="table is-striped">
      <thead>
        <tr>
          <th @click="sort('firstname')">
            First Name
            <div class="icon" v-if="order === 'firstname'">
              <span v-if="sortAscending" class="fa fa-sort-alpha-asc"></span>
              <span v-else class="fa fa-sort-alpha-desc"></span>
            </div>
          </th>
          <th @click="sort('lastname')">
            Last Name
            <div class="icon" v-if="order === 'lastname'">
              <span v-if="sortAscending" class="fa fa-sort-alpha-asc"></span>
              <span v-else class="fa fa-sort-alpha-desc"></span>
            </div>
          </th>
          <th @click="sort('troop')">
            Troop
            <div class="icon" v-if="order === 'troop'">
              <span v-if="sortAscending" class="fa fa-sort-numeric-asc"></span>
              <span v-else class="fa fa-sort-numeric-desc"></span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="scout in filteredScouts">
          <td>{{ scout.firstname }}</td>
          <td>{{ scout.lastname }}</td>
          <td>{{ scout.troop }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

import URLS from 'urls';

export default {
  data() {
    return {
      error: '',
      eventsFilter: null,
      scouts: [],
      search: '',
      order: 'troop',
      sortAscending: true,
      troopFilter: null
    };
  },
  computed: {
    filteredScouts() {
      let scouts = this.scouts;

      if (this.troopFilter) {
        scouts = _.filter(scouts, (scout) => {
          return scout.troop === this.troopFilter;
        });
      }

      if (this.eventsFilter) {
        scouts = _.filter(scouts, (scout) => {
          return _.some(scout.registrations, { "event_id": this.eventsFilter });
        });
      }

      scouts = _.filter(scouts, (scout) => {
        return scout.fullname.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });

      let sortOrder = this.sortAscending ? 'asc' : 'desc';

      return _.orderBy(scouts, this.order, sortOrder);
    },
    troops() {
      if (!this.scouts) {
        return [];
      }

      return _.orderBy(_.uniq(_.map(this.scouts, ('troop'))));
    }
  },
  methods: {
    dismissError() {
      this.error = '';
    },
    pickEvent(eventId) {
      this.eventsFilter = eventId;
    },
    reset() {
      this.eventsFilter = null;
      this.troopFilter = null;
      this.search = '';
      this.sortAscending = true;
      this.order = 'troop';
    },
    sort(order) {
      if (order === this.order) {
        this.sortAscending = !this.sortAscending;
      } else {
        this.order = order;
        this.sortAscending = true;
      }
    }
  },
  mounted() {
    this.loading = true;
    axios.get(URLS.SCOUTS_URL)
      .then((response) => {
        this.loading = false;
        console.log(response);
        this.scouts = response.data;
        this.error = '';
      })
      .catch(() => {
        this.loading = false
        this.error = 'Failed to retrieve scouts. Please refresh and try again.';
      });
  }
}
</script>

<style lang="sass" scoped>
  .notification {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  table {
    margin-top: 2rem;
  }

  .scout-list-filters {
    margin-top: 2rem;
  }
</style>