<template>
  <div>
    <div v-if="!loading">
      <h5 class="title is-5">
        {{ event.semester }} {{ event.year}}
        <button class="is-white button is-small"
                data-balloon="Edit Assignments"
                data-balloon-pos="left"
                @click.prevent="toggleEditing()"
                v-if="!editing">
          <span class="icon is-small">
            <span class="fa fa-edit"
                  aria-label="Edit Assignments"></span>
          </span>
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
                          :assignments="assignmentList">
      </scout-registration>
    </div>
    <spinner-page v-else></spinner-page>
  </div>
</template>

<script>
import ScoutRegistration from './ScoutRegistration.vue';
import AssignmentEdit from 'components/shared/attendance/AssignmentEdit.vue';
import RegistrationMappers from 'mixins/RegistrationMappers';


export default {
  data () {
    return {
      editing: false,
      error: '',
      loading: false
    };
  },
  methods: {
    toggleEditing () {
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
  mounted () {
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

<style lang="scss" scoped>

</style>
