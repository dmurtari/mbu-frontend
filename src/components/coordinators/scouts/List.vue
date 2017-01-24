<template>
  <div>
    <h3 class="title is-4">Your Troop</h3>
    <p>
      This is an overview of the scouts that you have added to your troop. You 
      can add new scouts, edit scout information, and remove scouts from your 
      troop.
    </p>
    <br>
    <button class="button is-primary"
            v-if="!displayAddScout"
            @click="toggleAdd()">
      Add a new scout
    </button>
    <create-scout v-if="displayAddScout"
                  @close="toggleAdd()"></create-scout>
    <br>
    <div class="box scout-list-filters">
      <div class="columns">
        <div class="column is-6">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label" for="scout-list-sort-filter">Sort&nbsp;by:</label>
            </div>
            <span class="select">
              <select id="scout-list-sort-filter"
                      v-model="sortBy">
                <option v-for="option in orders" :value="option.value">
                  {{ option.text }}
                </option>
              </select>
            </span>
          </div>
        </div>
        <div class="column is-6">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label" for="scout-list-find">Search:</label>
            </div>
            <div class="control has-addons">
              <input class="input"
                     id="scout-list-find"
                     v-model="search"></input>
              <button class="button" 
                      @click="clearSearch()"
                      :class="{ 'is-disabled': search.length <= 0 }">
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="scout-list">
      <scout v-for="scout in filteredScouts" :scout="scout"></scout>
    </div>
  </div>
</template>

<script>
import Create from './Create.vue';
import { mapGetters } from 'vuex';

import Scout from './Scout.vue';

export default { 
  data() {
    return {
      displayAddScout: false,
      sortBy: 'lastname',
      orders: [
        { value: 'firstname', text: 'First Name' },
        { value: 'lastname', text: 'Last Name' },
        { value: 'created_at', text: 'Date Added' },
        { value: 'updated_at', text: 'Date Updated' }
      ],
      search: ''
    };
  },
  computed: {
    ...mapGetters([
      'profile',
      'scouts'
    ]),
    orderedScouts() {
      return _.orderBy(this.scouts, this.sortBy);
    },
    filteredScouts() {
      return _.filter(this.orderedScouts, (scout) => {
        return scout.fullname.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    }
  },
  methods: {
    toggleAdd() {
      this.displayAddScout = !this.displayAddScout;
    },
    clearSearch() {
      this.search = '';
    }
  },
  mounted() {
    this.$store.dispatch('getScouts', this.profile.id);
  },
  components: {
    'create-scout': Create,
    'scout': Scout
  }
}
</script>

<style lang="sass" scoped>
  .scout-list-filters {
    margin-top: 2em;
  }
</style>