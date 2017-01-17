<template>
  <div class="section">
    <h4 class="title is-4">Edit Your Information</h4>
    <form class="columns is-multiline">
      <div class="alert alert-danger" v-if="error">
        {{ error }}
      </div>
      <div class="control column is-6">
        <label class="label" for="edit-firstname">First Name</label>
        <input type="text"
                class="input"
                id="edit-firstname"
                v-model="profileUpdate.firstname">
      </div>
      <div class="control column is-6">
        <label class="label" for="edit-lastname">Last Name</label>
        <input type="text"
                class="input"
                id="edit-lastname"
                v-model="profileUpdate.lastname">
      </div>
      <template v-if="profile.role === 'coordinator'">
        <div class="control column is-4">
          <label class="label" for="edit-troop">Troop</label>
          <input type="number"
                  class="input"
                  id="edit-troop"
                  placeholder="Troop"
                  v-model="profileUpdate.coordinator.troop">
        </div>
        <div class="control column is-4">
          <label class="label" for="edit-district">District</label>
          <input type="text"
                  class="input"
                  id="edit-district"
                  placeholder="District"
                  v-model="profileUpdate.coordinator.district">
        </div>
        <div class="control column is-4">
          <label class="label" for="edit-council">Council</label>
          <input type="text"
                  class="input"
                  id="edit-council"
                  placeholder="Council"
                  v-model="profileUpdate.coordinator.council">
        </div>
      </template>
      <template v-if="profile.role === 'teacher'">
        <div class="control column is-12">
          <label class="label" for="edit-chapter">Chapter/Organization</label>
          <input type="text"
                  class="input"
                  id="edit-chapter"
                  placeholder="Your group"
                  v-model="profileUpdate.teacher.chapter">
        </div>
      </template>
      <div class="control column is-12">
        <button class="button is-primary" 
                :class="{ 'is-disabled is-loading': saving }"
                @click.prevent="update()">
          {{ saving ? 'Saving Changes...' : 'Save Changes' }}
        </button>
        <button class="button"
                :class="{ 'is-disabled is-loading': saving }"
                @click.prevent="cancel()">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      profileUpdate: {
        firstname: '',
        lastname: '',
        teacher: {
          chapter: ''
        },
        coordinator: {
          troop: '',
          district: '',
          council: ''
        }
      },
      error: '',
      saving: false
    }
  },
  computed: {
    ...mapGetters([
      'isAdmin'
    ])
  },
  methods: {
    cancel() {
      this.$emit('toggle');
    },
    update() {
      let profile = {
        id: this.profile.id,
        firstname: this.profileUpdate.firstname,
        lastname: this.profileUpdate.lastname
      }

      switch (this.profile.role){
        case 'coordinator':
          profile.details = this.profileUpdate.coordinator;
          break;
        case 'teacher':
          profile.details = this.profileUpdate.teacher;
          break;
      }

      this.saving = true;
      this.$store.dispatch('updateProfile', profile)
        .then(() => {
          this.saving = false;
          this.error = '';
          this.$emit('toggle');
        })
        .catch((err) => {
          this.saving = false;
          this.error = 'Failed to save changes. Please try again.';
        });
    }
  },
  mounted() {
    this.profileUpdate.firstname = this.profile.firstname;
    this.profileUpdate.lastname = this.profile.lastname;
    this.profileUpdate[this.profile.role] = _.clone(this.profile.details);
  }
}
</script>