<template>
  <div class="box filters">
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
                          v-model="troopFilterProp"
                          @change="troopSelected($event.target.value)">
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
                       v-model="searchProp"
                       @input="searchEntered($event.target.value)"></input>
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
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    eventId: Number,
    troopFilter: Number,
    search: String,
    troops: Array
  },
  data () {
    return {
      eventIdProp: this.eventId,
      troopFilterProp: this.troopFilter,
      searchProp: this.search,
    };
  },
  methods: {
    troopSelected (troop) {
      let query = _.clone(this.$route.query);
      query.troop = troop;

      this.$router.replace({
        query: query
      });

      this.$emit('update:troopFilter',
        troop ? Number(troop) : null
      );
    },
    pickEvent (eventId) {
      let query = _.clone(this.$route.query);
      query.event = eventId;

      this.$router.replace({
        query: query
      });

      this.$router.replace({
        query: query
      });

      this.$emit('update:eventId', Number(eventId));
    },
    searchEntered (search) {
      let query = _.clone(this.$route.query);
      query.search = search;

      this.$router.replace({
        query: query
      });

      this.$emit('update:search', search)
    }
  },
  mounted () {
    let query = this.$route.query;

    if (query.troop) {
      this.troopSelected(query.troop)
    }

    if (query.event) {
      this.pickEvent(query.event)
    }

    if (query.search) {
      this.searchEntered(query.search);
    }
  }
}
</script>
