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
               :class="{ 'is-danger': $v.profileUpdate.firstname.$error }"
               @blur="$v.profileUpdate.firstname.$touch"
               v-model="profileUpdate.firstname">
        <span class="help is-danger" v-if="$v.profileUpdate.firstname.$error">
          Please enter your first name
        </span>
      </div>
      <div class="control column is-6">
        <label class="label" for="edit-lastname">Last Name</label>
        <input type="text"
               class="input"
               id="edit-lastname"
               :class="{ 'is-danger': $v.profileUpdate.lastname.$error }"
               @blur="$v.profileUpdate.lastname.$touch"
               v-model="profileUpdate.lastname">
        <span class="help is-danger" v-if="$v.profileUpdate.lastname.$error">
          Please enter your last name
        </span>
      </div>
      <template v-if="profile.role === 'coordinator'">
        <div class="control column is-4">
          <label class="label" for="edit-troop">Troop</label>
          <input type="number"
                 class="input"
                 id="edit-troop"
                 placeholder="Troop"
                 :class="{ 'is-danger': $v.profileUpdate.coordinator.troop.$error }"
                 @blur="$v.profileUpdate.coordinator.troop.$touch"
                 v-model="profileUpdate.coordinator.troop">
          <span class="help is-danger" v-if="$v.profileUpdate.coordinator.troop.$error">
            Please enter the troop you are representing
          </span>
        </div>
        <div class="control column is-4">
          <label class="label" for="edit-district">District</label>
          <input type="text"
                 class="input"
                 id="edit-district"
                 placeholder="District"
                 :class="{ 'is-danger': $v.profileUpdate.coordinator.district.$error }"
                 @blur="$v.profileUpdate.coordinator.district.$touch"
                 v-model="profileUpdate.coordinator.district">
          <span class="help is-danger" v-if="$v.profileUpdate.coordinator.district.$error">
            Please enter your district
          </span>
        </div>
        <div class="control column is-4">
          <label class="label" for="edit-council">Council</label>
          <input type="text"
                 class="input"
                 id="edit-council"
                 placeholder="Council"
                 :class="{ 'is-danger': $v.profileUpdate.coordinator.council.$error }"
                 @blur="$v.profileUpdate.coordinator.council.$touch"
                 v-model="profileUpdate.coordinator.council">
          <span class="help is-danger" v-if="$v.profileUpdate.coordinator.council.$error">
            Please enter your council
          </span>
        </div>
      </template>
      <template v-if="profile.role === 'teacher'">
        <div class="control column is-12">
          <label class="label" for="edit-chapter">Chapter/Organization</label>
          <input type="text"
                 class="input"
                 id="edit-chapter"
                 placeholder="Your group"
                 :class="{ 'is-danger': $v.profileUpdate.teacher.chapter.$error }"
                 @blur="$v.profileUpdate.teacher.chapter.$touch"
                 v-model="profileUpdate.teacher.chapter">
          <span class="help is-danger" v-if="$v.profileUpdate.teacher.chapter.$error">
            Please enter the group you are affiliated with (e.g. APO chapter)
          </span>
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
import { required, alphaNum } from 'vuelidate/lib/validators'

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
      this.saving = true;

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
  },
  validations: {
    profileUpdate: {
      firstname: { required },
      lastname: { required },
      coordinator: {
        troop: { required, alphaNum },
        district: { required },
        council: { required }
      },
      teacher: {
        chapter: { required }
      }
    },
    basicInfo: ['profileUpdate.firstname', 'profileUpdate.lastname'],
    coordinatorInfo: ['profileUpdate.coordinator.troop', 'profileUpdate.coordinator.district',
                      'profileUpdate.coordinator.council'],
    teacherInfo: ['profileUpdate.teacher.chapter']
  }
}
</script>