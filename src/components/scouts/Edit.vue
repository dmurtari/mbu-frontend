<template>
  <div>
    <form>
      <div class="row">
          <div class="form-group col-xs-6">
            <label for="scout-edit-first-name">First Name</label>
            <input type="text"
                   class="form-control"
                   id="scout-edit-first-name"
                   placeholder="First Name"
                   v-model="scoutUpdate.firstname">
          </div>
          <div class="form-group col-xs-6">
            <label for="scout-edit-last-name">Last Name</label>
            <input type="text"
                   class="form-control"
                   id="scout-edit-last-name"
                   placeholder="Last Name"
                   v-model="scoutUpdate.lastname">
          </div>
          <div class="form-group col-xs-8">
            <label for="scout-edit-birthday">Birthday</label>
            <masked-input mask="99/99/9999"
                          placeholder="mm/dd/yyyy"
                          id="scout-edit-birthday"
                          v-model="scoutUpdate.birthday">
          </div>
          <div class="form-group col-xs-4">
            <label for="scout-edit-troop">Troop</label>
            <input type="number"
                   class="form-control"
                   id="scout-edit-troop"
                   placeholder="Troop"
                   v-model="scoutUpdate.troop">
          </div>
        </div>
        <div class="row">
          <div class="form-group col-xs-12">
            <label for="scout-edit-notes">Anything else we should know?</label>
            <textarea class="form-control"
                      id="scout-edit-notes"
                      rows="2"
                      placeholder="Allergies, dietery needs, etc."
                      v-model="scoutUpdate.notes"></textarea>
          </div>
        </div>
        <div class="row container-fluid">
          <h5>Emergency Contact Information</h5>
        </div>
        <div class="container-fluid">
          <div class="form-group row">
            <label for="scout-edit-emergency-name">Name</label>
            <input type="text"
                   class="form-control"
                   id="scout-edit-emergency-name"
                   placeholder="Name"
                   v-model="scoutUpdate.emergency_name">
          </div>
          <div class="form-group row">
            <label for="scout-edit-emergency-relation">Relation</label>
            <input type="text"
                   class="form-control"
                   id="scout-edit-emergency-relation"
                   placeholder="Relationship to Scout"
                   v-model="scoutUpdate.emergency_relation">
          </div>
          <div class="form-group row">
            <label for="scout-edit-emergency-phone">Phone Number</label>
            <masked-input mask="(999) 999-9999"
                          placeholder="(___) ___-____"
                          id="scout-edit-emergency-phone"
                          v-model="scoutUpdate.emergency_phone">
          </div>
        <div class="pull-right">
          <button class="btn btn-primary" 
                  @click.prevent="saveScout()">Add Scout</button>
          <button class="btn btn-default" 
                  @click.prevent="close()">Cancel</button>
        </div>
    </form>
  </div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';

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
      }
    };
  },
  props: {
    scout: {
      type: Object,
      required: true
    }
  },
  methods: {
    saveScout() {

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