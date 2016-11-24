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
    <div class="sidebar-buttons">
      <button type="button" 
              class="btn btn-info btn-block edit-button"
              @click="toggleEdit()">Edit Profile</button>
    </div>
  </aside>
  <section class="col-sm-7 col-sm-offset-1">
    <div v-if="!editing">
      <general-profile id="general-profile"
                       class="general-profile" :profile="profile"></general-profile>
      <coordinator-detail v-if="profile.role === 'coordinator' "
                          id="coordinator-details"></coordinator-detail>
    </div>
    <div v-if="editing">
      <edit-profile :profile="profile"
                    @toggle="toggleEdit()"></edit-profile>
    </div>
  </section>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

import General from './General.vue';
import Coordinator from './Coordinator.vue';
import Edit from './Edit.vue';

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
    'coordinator-detail': Coordinator,
    'general-profile': General,
    'edit-profile': Edit
  }
}
</script>

<style scoped lang="sass">
.general-profile {
  padding-bottom: 1em;
}

.sidebar-buttons {
  margin-top: 1em;
  margin-bottom: 3em;
}
</style>