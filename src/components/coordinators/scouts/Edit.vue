<template>
  <div>
    <div class="notification is-danger" v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <form v-if="!showDeleteConfirmation">
      <div class="columns is-multiline">
        <div class="control column is-3">
          <label class="label" for="scout-edit-first-name">First Name</label>
          <input type="text"
                 class="input"
                 id="scout-edit-first-name"
                 placeholder="First Name"
                 :class="{ 'is-danger': $v.scoutUpdate.firstname.$error }"
                  @blur="$v.scoutUpdate.firstname.$touch"
                 v-model="scoutUpdate.firstname">
          <span class="help is-danger" v-if="$v.scoutUpdate.firstname.$error">
            Please enter the scout's first name
          </span>
        </div>
        <div class="control column is-3">
          <label class="label" for="scout-edit-last-name">Last Name</label>
          <input type="text"
                 class="input"
                 id="scout-edit-last-name"
                 placeholder="Last Name"
                 :class="{ 'is-danger': $v.scoutUpdate.lastname.$error }"
                  @blur="$v.scoutUpdate.lastname.$touch"
                 v-model="scoutUpdate.lastname">
          <span class="help is-danger" v-if="$v.scoutUpdate.lastname.$error">
            Please enter the scout's last name
          </span>
        </div>
        <div class="control column is-3">
          <label class="label" for="scout-edit-birthday">Birthday</label>
          <masked-input mask="99/99/9999"
                        placeholder="mm/dd/yyyy"
                        id="scout-edit-birthday"
                        :class="{ 'is-danger': $v.scoutUpdate.birthday.$error }"
                        @blur="$v.scoutUpdate.birthday.$touch"
                        v-model="scoutUpdate.birthday">
          <span class="help is-danger" v-if="$v.scoutUpdate.birthday.$error">
            Please enter the scout's birthday
          </span>
        </div>
        <div class="control column is-3">
          <label class="label" for="scout-edit-troop">Troop</label>
          <input type="number"
                  class="input"
                  id="scout-edit-troop"
                  placeholder="Troop"
                  :class="{ 'is-danger': $v.scoutUpdate.troop.$error }"
                  @blur="$v.scoutUpdate.troop.$touch"
                  v-model="scoutUpdate.troop">
          <span class="help is-danger" v-if="$v.scoutUpdate.troop.$error">
            Please enter the scout's troop
          </span>
        </div>
        <div class="control column is-12">
          <label class="label" for="scout-edit-notes">Anything else we should know?</label>
          <textarea class="textarea"
                    id="scout-edit-notes"
                    rows="2"
                    placeholder="Allergies, dietery needs, etc."
                    v-model="scoutUpdate.notes"></textarea>
        </div>
        <div class="column is-12">
          <h5 class="title is-5">Emergency Contact Information</h5>
        </div>
        <div class="control column is-4">
          <label class="label" for="scout-edit-emergency-name">Name</label>
          <input type="text"
                  class="input"
                  id="scout-edit-emergency-name"
                  placeholder="Name"
                  :class="{ 'is-danger': $v.scoutUpdate.emergency_name.$error }"
                  @blur="$v.scoutUpdate.emergency_name.$touch"
                  v-model="scoutUpdate.emergency_name">
          <span class="help is-danger" v-if="$v.scoutUpdate.emergency_name.$error">
            Please enter the name of the person we should contact in event
            of emergency
          </span>
        </div>
        <div class="control column is-4">
          <label class="label" for="scout-edit-emergency-relation">Relation</label>
          <input type="text"
                  class="input"
                  id="scout-edit-emergency-relation"
                  placeholder="Relationship to Scout"
                  :class="{ 'is-danger': $v.scoutUpdate.emergency_relation.$error }"
                  @blur="$v.scoutUpdate.emergency_relation.$touch"
                  v-model="scoutUpdate.emergency_relation">
          <span class="help is-danger" v-if="$v.scoutUpdate.emergency_relation.$error">
            Please enter the relationship of the emergency contact to the scout
          </span>
        </div>
        <div class="control column is-4">
          <label class="label" for="scout-edit-emergency-phone">Phone Number</label>
          <masked-input mask="(999) 999-9999"
                        placeholder="(___) ___-____"
                        id="scout-edit-emergency-phone"
                        :class="{ 'is-danger': $v.scoutUpdate.emergency_phone.$error }"
                        @blur="$v.scoutUpdate.emergency_phone.$touch"
                        v-model="scoutUpdate.emergency_phone">
          <span class="help is-danger" v-if="$v.scoutUpdate.emergency_phone.$error">
            Please enter the phone number of the person we should contact in event
            of emergency
          </span>
        </div>
        <div class="column">
        <button class="button is-primary"
                :disabled="$v.$invalid"
                :class="{ 'is-disabled is-loading': saving }"
                @click.prevent="saveScout()">Save</button>
        <button class="button"
                @click.prevent="close()">Cancel</button>
        <button class="button is-danger is-pulled-right"
                @click.prevent="toggleDeleteConfirmation()">Delete</button>
      </div>
    </form>
    <confirm-delete v-if="showDeleteConfirmation"
                    class="container-fluid"
                    :match-text="this.scout.firstname + ' ' + this.scout.lastname"
                    :placeholder="'Full Name'"
                    @deleteSuccess="deleteScout()"
                    @close="toggleDeleteConfirmation()">
      <span slot="header">
        Do you really want to delete this scout?
      </span>
      <span slot="help-text">
        Enter the scout's full name to confirm that you wish to delete this scout.
        <b>This action cannot be undone, and will permanently delete all
        associated records and registrations.</b>
      </span>
    </confirm-delete>
  </div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
import { mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import { date, phone } from 'validators';

export default {
  data() {
    return {
      scoutUpdate: {
        firstname: '',
        lastname: '',
        birthday: '',
        troop: '',
        notes: '',
        emergency_name: '',
        emergency_phone: '',
        emergency_relation: ''
      },
      error: '',
      saving: false,
      showDeleteConfirmation: false
    };
  },
  props: {
    scout: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'profile'
    ])
  },
  methods: {
    deleteScout() {
      this.$store.dispatch('deleteScout', {
        userId: this.scout.user_id,
        scoutId: this.scout.id
      })
        .then(() => {
          return this.$store.dispatch('getScouts', this.profile.id);
        })
        .then(() => {
          this.error = '';
          this.close();
        })
        .catch(() => {
          this.error = 'Failed to delete scout. Please refresh and try again';
        })
    },
    saveScout() {
      this.saving = true;
      this.$store.dispatch('updateScout', {
        userId: this.scout.user_id,
        scout: this.scoutUpdate
      })
        .then(() => {
          return this.$store.dispatch('getScouts', this.profile.id);
        })
        .then(() => {
          this.saving = false;
          this.error = '';
          this.close();
        })
        .catch(() => {
          this.saving = true;
          this.error = 'Failed to save changes. Please refresh and try again';
        })
    },
    toggleDeleteConfirmation() {
      this.showDeleteConfirmation = !this.showDeleteConfirmation;
    },
    close() {
      this.$emit('close');
    }
  },
  mounted() {
    this.scoutUpdate = _.clone(this.scout);
    this.scoutUpdate.birthday = moment(this.scoutUpdate.birthday).format('MM/DD/YYYY')
  },
  validations: {
    scoutUpdate: {
      firstname: { required },
      lastname: { required },
      birthday: { required, date: date('MM/DD/YYYY') },
      troop: { required },
      emergency_name: { required },
      emergency_phone: { required, phone },
      emergency_relation: { required }
    }
  }
}
</script>