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
                   :class="{
                     'is-disabled': saving,
                     'is-danger': $v.completions.$each[scout.scoutId].$invalid
                   }"
                   aria-labelledby="Completions"
                   type="text"
                   @blur="$v.completions.$each[scout.scoutId].$touch"
                   placeholder="1, 2, 3, ...">
            <span class="help is-danger"
                  v-if="$v.completions.$each[scout.scoutId].$invalid">
              Completions must be a comma separated list of letters and/or numbers.
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-primary"
                :class="{ 'is-loading is-disabled': saving, 'is-disabled': $v.$invalid }"
                @click.prevent="save()">Save Completions</button>
      </div>
      <div class="control">
        <button class="button"
                :class="{ 'is-disabled': saving }"
                @click.prevent="cancel()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import URLS from 'urls';

import Vue from 'vue';
import axios from 'axios';
import _ from 'lodash';

import { commaSeparated } from 'validators';

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
  methods: {
    save() {
      this.saving = true;
      Promise.all(_.map(this.completions, (completion, scoutId) => {
        let scout = _.find(this.scouts, [ 'scoutId', Number(scoutId) ]);
        let completions = _.without(_.map(_.split(completion, ','), (completion) => {
          return Number(_.trim(completion));
        }), null, 0);

        return axios.put(URLS.SCOUTS_URL + scoutId + '/registrations/' +
          scout.registrationId + '/assignments/' + this.offeringId, {
            completions: completions
          });
      }))
        .then(() => {
          this.saving = false;
          this.error = '';
          this.$emit('done');
        })
        .catch(() => {
          this.saving = false;
          this.error = 'Failed to save records. Please refresh and try again.';
        });

    },
    cancel() {
      this.$emit('done');
    }
  },
  beforeMount() {
    _.forEach(this.scouts, (scout) => {
      Vue.set(this.completions, scout.scoutId, _.join(_.orderBy(scout.completions), ', '));
    });
  },
  validations: {
    completions: {
      $each: { commaSeparated }
    }
  }
}
</script>