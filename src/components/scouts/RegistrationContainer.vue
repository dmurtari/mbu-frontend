<template>
  <div>
    <div v-if="!loading">
      <h5 class="title is-5">
        {{ event.semester }} {{ event.year}}
        <button class="edit-button button is-pulled-right"
                data-balloon="Edit Assignments"
                data-balloon-pos="left"
                @click.prevent="toggleEditing()"
                v-if="!editing">
          <span class="fa fa-edit" aria-label="Edit Assignments"></span>
        </button>
      </h5>
      <assignment-edit v-if="editing"
                      :scout="scout"
                      :event="event"
                      :preferences="registration.preferences"
                      :registration="registration"
                      @done="toggleEditing()"></assignment-edit>
      <scout-registration v-else
                          :event="event"
                          :preferences="registrationPreferences"
                          :purchases="registrationPurchases"
                          :assignments="registrationAssignments">
      </scout-registration>
    </div>
    <div v-else>
      <loader v-if="loading"
              :color="'lightgray'"
              class="loader-centered"></loader>
    </div>
  </div>
</template>

<script>
import ScoutRegistration from './ScoutRegistration.vue';
import AssignmentEdit from '../administration/attendance/AssignmentEdit.vue';
import RegistrationMappers from '../../mixins/RegistrationMappers';


export default {
  props: {
    scout: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false,
      error: '',
      loading: false
    };
  },
  methods: {
    toggleEditing() {
      this.editing = !this.editing;

      if (!this.editing) {
        this.$emit('done');
      }
    }
  },
  components: {
    AssignmentEdit,
    ScoutRegistration
  },
  mixins: [
    RegistrationMappers
  ],
  mounted() {
    this.loading = true;
    this.$store.dispatch('getRegistrations', this.event.id)
      .then(() => {
        this.loading = false;
        this.error = '';
      })
      .catch(() => {
        this.loading = false;
        this.error = 'Failed to load registration information.';
      })
  }
}
</script>

<style lang="sass" scoped>
  .edit-button {
    margin-top: -.5em;
    margin-right: -.5em;
  }
</style>