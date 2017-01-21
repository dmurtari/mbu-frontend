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
                 v-model="scoutUpdate.firstname">
        </div>
        <div class="control column is-3">
          <label class="label" for="scout-edit-last-name">Last Name</label>
          <input type="text"
                 class="input"
                 id="scout-edit-last-name"
                 placeholder="Last Name"
                 v-model="scoutUpdate.lastname">
        </div>
        <div class="control column is-3">
          <label class="label" for="scout-edit-birthday">Birthday</label>
          <masked-input mask="99/99/9999"
                        placeholder="mm/dd/yyyy"
                        id="scout-edit-birthday"
                        v-model="scoutUpdate.birthday">
        </div>
        <div class="control column is-3">
          <label class="label" for="scout-edit-troop">Troop</label>
          <input type="number"
                  class="input"
                  id="scout-edit-troop"
                  placeholder="Troop"
                  v-model="scoutUpdate.troop">
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
                  v-model="scoutUpdate.emergency_name">
        </div>
        <div class="control column is-4">
          <label class="label" for="scout-edit-emergency-relation">Relation</label>
          <input type="text"
                  class="input"
                  id="scout-edit-emergency-relation"
                  placeholder="Relationship to Scout"
                  v-model="scoutUpdate.emergency_relation">
        </div>
        <div class="control column is-4">
          <label class="label" for="scout-edit-emergency-phone">Phone Number</label>
          <masked-input mask="(999) 999-9999"
                        placeholder="(___) ___-____"
                        id="scout-edit-emergency-phone"
                        v-model="scoutUpdate.emergency_phone">
        </div>
        <div class="column">
        <button class="button is-primary" 
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
      this.$store.dispatch('updateScout', {
        userId: this.scout.user_id,
        scout: this.scoutUpdate
      })
        .then(() => {
          return this.$store.dispatch('getScouts', this.profile.id);
        })
        .then(() => {
          this.error = '';
          this.close();
        })
        .catch(() => {
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
  }
}
</script>