<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Scout</th>
          <th>Troop</th>
          <th>Completed Requirements</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="scout in scouts">
          <td>{{ scout.fullname }}</td>
          <td>{{ scout.troop }}</td>
          <td>
            <input class="input"
                   v-model="completions[scout.scoutId]"
                   :id="'completion-scout-' + scout.scoutId"
                   aria-labelledby="Completions"
                   type="text"
                   placeholder="1, 2, 3, ...">
          </td>
        </tr>
      </tbody>
    </table>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-primary"
                @click.prevent="save()">Save Completions</button>
      </div>
      <div class="control">
        <button class="button"
                @click.prevent="cancel()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    period: {
      type: Number,
      requred: true
    },
    requirements: {
      type: Array,
      default: () => []
    },
    scouts: {
      type: Array,
      default: () => []
    },
    offeringId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      completions: {},
      error: '',
      saving: false
    };
  },
  computed: {

  },
  methods: {
    save() {
      this.$emit('done');
    },
    cancel() {
      this.$emit('done');
    }
  },
  mounted() {
    _.forEach(this.scouts, (scout) => {
      this.completions[scout.scoutId] = _.join(scout.completions, ', ');
    });
  }
}
</script>