<template>
  <div class="attendee-container">
    <h5 class="title is-5">
      Attendees for Period {{ period }}
      <span v-if="scouts.length > 0">
        ({{ scouts.length }})
      </span>
      <div class="is-pulled-right"
           v-if="scouts.length > 0">
        <button class="titlebar-button button is-light"
                @click="toggleEdit()">
          Edit Completions
        </button>
      </div>
    </h5>
    <completions-edit v-if="editing"
                      :scouts="scouts"
                      :period="period"
                      :requirements="requirements"
                      @done="toggleEdit()"></completions-edit>
    <div v-else>
      <div v-if="scouts.length < 1"
           class="notification">
        There are no scouts attending this period.
      </div>
      <table v-else
             class="table is-striped">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Troop</th>
            <th>Completed Requirements</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="scout in scouts"
              :key="scout.id">
            <td>{{ scout.fullname }}</td>
            <td>{{ scout.troop }}</td>
            <td>{{ scout.completions | commaSeparated }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

import CompletionsEdit from './CompletionsEdit.vue';

export default {
  props: {
    period: {
      type: Number,
      required: true
    },
    scouts: {
      type: Array,
      default: () => []
    },
    requirements: {
      type: Array,
      defailt: () => []
    }
  },
  data() {
    return {
      editing: false
    };
  },
  methods: {
    toggleEdit() {
      this.editing = !this.editing;
    }
  },
  components: {
    CompletionsEdit
  }
}
</script>

<style lang="sass" scoped>
  .attendee-container {
    padding-top: 2rem;
    padding-bottom: 1rem;
  }
</style>