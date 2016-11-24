<template>
<div>
  <form>
    <div class="row">
      <div class="form-group col-sm-6 col-xs-6">
        <label for="edit-firstname">First Name</label>
        <input type="text"
              class="form-control"
              id="edit-firstname"
              v-model="profileUpdate.firstname">
      </div>
      <div class="form-group col-sm-6 col-xs-6">
        <label for="edit-lastname">Last Name</label>
        <input type="text"
              class="form-control"
              id="edit-lastname"
              v-model="profileUpdate.lastname">
      </div>
    </div>
    <div class="row" v-if="profileUpdate.role === 'coordinator'">
      <div class="form-group col-sm-4">
        <label for="edit-troop">Troop</label>
        <input type="number"
                class="form-control"
                id="edit-troop"
                placeholder="Troop"
                v-model="profileUpdate.coordinator.troop">
      </div>
      <div class="form-group col-sm-4">
        <label for="edit-district">District</label>
        <input type="text"
                class="form-control"
                id="edit-district"
                placeholder="District"
                v-model="profileUpdate.coordinator.district">
      </div>
      <div class="form-group col-sm-4">
        <label for="edit-council">Council</label>
        <input type="text"
                class="form-control"
                id="edit-council"
                placeholder="Council"
                v-model="profileUpdate.coordinator.council">
      </div>
    </div>
    <div v-if="profileUpdate.role === 'teacher'">
      <div class="form-group">
        <label for="edit-chapter">Chapter/Organization</label>
        <input type="text"
                class="form-control"
                id="edit-chapter"
                placeholder="Your group"
                v-model="profileUpdate.teacher.chapter">
      </div>
    </div>
    <div class="form-group pull-right">
      <button class="btn btn-primary" @click="update()">Save Changes</button>
    </div>
  </form>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

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
      }
    }
  },
  computed: {
    ...mapGetters([
      'isAdmin'
    ])
  },
  methods: {
    update() {
      console.log('Updating')
    }
  },
  mounted() {
    this.profileUpdate.firstname = this.profile.firstname;
    this.profileUpdate.lastname = this.profile.lastname;
    this.profileUpdate[this.profile.role] = this.profile.details;
  }
}
</script>