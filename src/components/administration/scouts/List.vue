<template>
  <div>
    <p>
      This is a list of all scouts that have ever been registered for MBU Online.
    </p>
    <div class="notification is-danger"
         v-if="error">
      <button class="delete"
              @click.prevent="dismissError()"></button>
      <p>
        {{ error }}
      </p>
    </div>
    <div class="box scout-list-filters">
      <div class="columns is-multiline">
        <div class="column is-6">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Registered:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <events-dropdown @select="pickEvent($event)"></events-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Troop:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <span class="input-group select">
                    <select class="input"
                            v-model="troopFilter">
                      <option :value="null">All Troops</option>
                      <option v-for="troop in troops"
                              :value="troop"
                              :key="troop">
                        {{ troop }}
                      </option>
                    </select>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="search-container field is-horizontal">
            <div class="field-label is-normal">
              <label class="label"
                     for="scout-list-find">Name:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input class="input is-expanded"
                         id="scout-list-find"
                         v-model="search"></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="field is-grouped">
            <div class="control is-pulled-right">
              <button class="button is-pulled-right"
                      @click.prevent="reset()">Reset Filters</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="filteredScouts.length > 0">
      <paginated-table :target="'scouts'"
                       :contents="filteredScouts"
                       :per="20"
                       :showLinks="true">
        <thead slot="header">
          <tr>
            <th @click="sort('firstname')"
                class="sortable"
                :class="{ 'sorted-column': order === 'firstname' }">
              First Name
              <span class="icon is-small"
                    v-if="order === 'firstname'">
                <span v-if="sortAscending"
                      class="fa fa-sort-alpha-asc"></span>
                <span v-else
                      class="fa fa-sort-alpha-desc"></span>
              </span>
            </th>
            <th @click="sort('lastname')"
                class="sortable"
                :class="{ 'sorted-column': order === 'lastname' }">
              Last Name
              <span class="icon is-small"
                    v-if="order === 'lastname'">
                <span v-if="sortAscending"
                      class="fa fa-sort-alpha-asc"></span>
                <span v-else
                      class="fa fa-sort-alpha-desc"></span>
              </span>
            </th>
            <th @click="sort('troop')"
                class="sortable"
                :class="{ 'sorted-column': order === 'troop' }">
              Troop
              <span class="icon is-small"
                    v-if="order === 'troop'">
                <span v-if="sortAscending"
                      class="fa fa-sort-numeric-asc"></span>
                <span v-else
                      class="fa fa-sort-numeric-desc"></span>
              </span>
            </th>
            <th>Coordinator</th>
            <th colspan="1"></th>
          </tr>
        </thead>
        <template slot="row"
                  scope="props">
          <scout-row :id="props.item.scout_id"
                     :firstname="props.item.firstname"
                     :lastname="props.item.lastname"
                     :troop="props.item.troop"
                     :registration="props.item.registrations"
                     :user="props.item.user">
          </scout-row>
        </template>
      </paginated-table>
    </div>
    <div class="notification"
         v-else>
      <p>
        There are no scouts that match the criteria you specified. Change the
        filters you have selected, or
        <a href="#"
           @click="reset()">reset all of the filters</a>.
      </p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

import URLS from 'urls';
import ScoutRow from './ScoutRow.vue';

export default {
  data () {
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
    filteredScouts () {
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
    troops () {
      if (!this.scouts) {
        return [];
      }

      return _.orderBy(_.uniq(_.map(this.scouts, ('troop'))));
    }
  },
  methods: {
    dismissError () {
      this.error = '';
    },
    pickEvent (eventId) {
      this.eventsFilter = eventId;
    },
    reset () {
      this.eventsFilter = null;
      this.troopFilter = null;
      this.search = '';
      this.sortAscending = true;
      this.order = 'troop';
    },
    sort (order) {
      if (order === this.order) {
        this.sortAscending = !this.sortAscending;
      } else {
        this.order = order;
        this.sortAscending = true;
      }
    }
  },
  mounted () {
    this.loading = true;
    axios.get(URLS.SCOUTS_URL)
      .then((response) => {
        this.loading = false;
        this.scouts = response.data;
        this.error = '';
      })
      .catch(() => {
        this.loading = false
        this.error = 'Failed to retrieve scouts. Please refresh and try again.';
      });
  },
  components: {
    ScoutRow
  }
}
</script>

<style lang="scss" scoped>
.notification {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.scout-list-filters {
  margin-top: 2rem;
}
</style>