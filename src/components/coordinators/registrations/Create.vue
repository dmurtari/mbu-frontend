<template>
  <div class="container">
    <div class="notification is-danger" v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <h5 class="title is-5">Add Merit Badge Preferences for {{ scout.fullname }}</h5>

    <div class="columns is-multiline">
      <p class="column is-12">
        Please select the top six merit badges that {{ scout.firstname}} would
        like to attend classes for. We will do our best to accommodate
        preferences.
      </p>
      <template v-for="(preference, index) in preferences">
        <div class="column is-6">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label"
                :for="'registration-rank' + index">
                {{ index + 1 }}:
                </label>
            </div>
            <div class="control">
              <span class="select">
                <select class="form-control"
                        :id="'registration-rank' + index"
                        v-model="preference.offering">
                  <option v-for="option in offerings" :value="option.details.id">
                    {{ option.name }}
                  </option>
                </select>
              </span>
            </div>
          </div>
        </div>
      </template>
      <div class="column is-12">
        <button class="button is-primary"
                :class="{ 'is-disabled is-loading': creating }"
                @click="registerScout()">
          Register Scout
        </button>
        <button class="button"
                @click="cancel()">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    scout: {
      type: Object,
      required: true
    },
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      preferences: [],
      creating: false,
      error: ''
    };
  },
  computed: {
    offerings() {
      return _.orderBy(this.event.offerings, 'name');
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    registerScout() {
      this.creating = true;
      this.$store.dispatch('addRegistration', {
        scoutId: this.scout.id,
        eventId: this.event.id
      })
        .then((registration) => {
          return this.$store.dispatch('setPreferences', {
            scoutId: this.scout.id,
            registrationId: registration.id,
            preferences: this.preferences
          })
        })
        .then(() => {
          this.creating = false;
          this.$emit('created');
        })
        .catch((err) => {
          this.creating = false;
          this.error = 'Failed to register scout for this event.';
        });
    }
  },
  mounted() {
    for (var i = 1; i <= 2; i++) {
      this.preferences.push({
        rank: i,
        offering: ''
      })
    }
  }
}
</script>