<template>
<div class="container-fluid">
  <div class="page-header">
    <h3>Your Profile</h3>
  </div>
  <aside class="col-sm-4">
    <div class="list-group">
      <router-link to="#general-profile" class="list-group-item">My Profile</router-link>
      <router-link to="#coordinator-details" class="list-group-item">Details</router-link>
    </div>
    <button type="button" 
            class="btn btn-info btn-block edit-button"
            @click="toggleEdit()">Edit Profile</button>
  </aside>
  <section class="col-sm-7 col-sm-offset-1">
    <div v-if="!editing">
      <general-profile id="general-profile"
                      class="general-profile" :profile="profile"></general-profile>
      <coordinator-detail v-if="profile.role === 'coordinator' "
                          id="coordinator-details"
                          :details="profile.details"></coordinator-detail>
    <div>
  </section>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

import GeneralProfile from './GeneralProfile.vue';
import CoordinatorDetail from './CoordinatorDetail.vue';

export default {
  data () {
    return {
      editing: false
    }
  },
  computed: {
    ...mapGetters([
      'profile'
    ])
  },
  methods: {
    toggleEdit() {
      this.editing = !this.editing;
    }
  },
  components: {
    'coordinator-detail': CoordinatorDetail,
    'general-profile': GeneralProfile
  }
}
</script>

<style scoped lang="sass">
.general-profile {
  padding-bottom: 1em;  
}

.edit-button {
  margin-top: 1em;
}
</style>