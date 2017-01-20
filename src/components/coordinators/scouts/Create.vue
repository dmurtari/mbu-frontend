<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h5>Add a Scout to Your Troop</h5>
      <span class="glyphicon glyphicon-remove close-button"
          @click="close()"
          aria-label="Close"></span>
    </div>
    <div class="panel-body">
      <div class="alert alert-danger" v-if="error">
        <p>
          {{ error }}
        </p>
      </div>
      <form>
        <div class="row">
          <div class="form-group col-sm-3">
            <label for="scout-create-first-name">First Name</label>
            <input type="text"
                   class="form-control"
                   id="scout-create-first-name"
                   placeholder="First Name"
                   v-model="scout.firstname">
          </div>
          <div class="form-group col-sm-3">
            <label for="scout-create-last-name">Last Name</label>
            <input type="text"
                   class="form-control"
                   id="scout-create-last-name"
                   placeholder="Last Name"
                   v-model="scout.lastname">
          </div>
          <div class="form-group col-sm-3">
            <label for="scout-create-birthday">Birthday</label>
            <masked-input mask="99/99/9999"
                          placeholder="mm/dd/yyyy"
                          id="scout-create-birthday"
                          v-model="scout.birthday">
          </div>
          <div class="form-group col-sm-3">
            <label for="scout-create-troop">Troop</label>
            <input type="number"
                   class="form-control"
                   id="scout-create-troop"
                   placeholder="Troop"
                   v-model="scout.troop">
          </div>
        </div>
        <div class="row">
          <div class="form-group col-sm-12">
            <label for="scout-create-notes">Anything else we should know?</label>
            <textarea class="form-control"
                      id="scout-create-notes"
                      rows="2"
                      placeholder="Allergies, dietery needs, etc."
                      v-model="scout.notes"></textarea>
          </div>
        </div>
        <div class="row container-fluid">
          <h5>Emergency Contact Information</h5>
          <p>
            We will contact this person in the event that something happens to
            this scout. If possible, please enter the information for someone 
            that will be able to reach the event should it be necessary.
          </p>
        </div>
        <div class="row">
          <div class="form-group col-sm-4">
            <label for="scout-create-emergency-name">Name</label>
            <input type="text"
                   class="form-control"
                   id="scout-create-emergency-name"
                   placeholder="Name"
                   v-model="scout.emergency_name">
          </div>
          <div class="form-group col-sm-4">
            <label for="scout-create-emergency-relation">Relation</label>
            <input type="text"
                   class="form-control"
                   id="scout-create-emergency-relation"
                   placeholder="Relationship to Scout"
                   v-model="scout.emergency_relation">
          </div>
          <div class="form-group col-sm-4">
            <label for="scout-create-emergency-phone">Phone Number</label>
            <masked-input mask="(999) 999-9999"
                          placeholder="(___) ___-____"
                          id="scout-create-emergency-phone"
                          v-model="scout.emergency_phone">
          </div>
        </div>
        <div class="pull-right">
          <button class="btn btn-primary" 
                  @click.prevent="createScout()">Add Scout</button>
          <button class="btn btn-default" 
                  @click.prevent="close()">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      scout: {
        firstname: '',
        lastname: '',
        birthday: '',
        troop: '',
        notes: '',
        emergency_name: '',
        emergency_phone: '',
        emergency_relation: ''
      },
      error: ''
    };
  },
  computed: {
    ...mapGetters([
      'profile'
    ])
  },
  methods: {
    close() {
      this.error = '';
      this.$emit('close');
    },
    createScout() {
      let scout = _.clone(this.scout);

      this.$store.dispatch('addScout', {
        scout: scout,
        userId: this.profile.id
      })
        .then(() => {
          return this.$store.dispatch('getScouts', this.profile.id);
        })
        .then(() => {
          this.error = '';
          this.close();
        })
        .catch((err) => {
          this.error = 'Error adding scout. Please refresh the page, and try again.';
        });
    }
  },
  mounted() {
    this.scout.troop = this.profile.details.troop;
  }
}
</script>

<style scoped lang="sass">
.panel-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>