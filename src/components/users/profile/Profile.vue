<template>
<div class="container-fluid">
  <div class="page-header">
    <h3>Your Profile</h3>
  </div>
  <aside class="col-sm-4" data-spy="affix" data-offset-top="60">
    <h5>Jump to a section:</h5>
    <div class="list-group">
      <a href="#general-profile" 
         @click="showDisplay()" 
         class="list-group-item">My Profile</a>
      <a href="#coordinator-details" 
         @click="showDisplay()" 
         class="list-group-item">Details</a>
    </div>
    <div class="sidebar-buttons list-group">
      <h5>Make changes to your account:</h5>
      <div class="btn-block">
        <button type="button" 
                class="list-group-item"
                @click="toggleEdit()">
          {{ state === 'editProfile' ? 'Cancel Edits' : 'Edit Profile' }}
        </button>
        <button type="button" 
                class="list-group-item"
                @click="toggleEditPassword()">
          {{ state === 'editPassword' ? 'Cancel Password Change' : 'Change Password' }}
        </button>
      </div>
      <br>
      <button type="button" 
              class="list-group-item list-group-item-danger"
              @click="toggleDeleteAccount()">
        {{ state === 'deleteAccount' ? 'Don\'t Delete' : 'Delete My Account' }}
      </button>
    </div>
  </aside>
  <section class="col-sm-7 col-sm-offset-1">
    <div v-if="state === 'display'">
      <general-profile id="general-profile"
                       class="general-profile" :profile="profile"></general-profile>
      <coordinator-detail v-if="profile.role === 'coordinator' "
                          id="coordinator-details"></coordinator-detail>
    </div>
    <div v-if="state === 'editProfile'">
      <edit-profile :profile="profile"
                    @toggle="toggleEdit()"></edit-profile>
    </div>
    <div v-if="state === 'editPassword'">
      <edit-password :id="profile.id"
                     @toggle="toggleEditPassword()"></edit-password>
    </div>
    <div v-if="state === 'deleteAccount'">
      <delete-account :firstname="profile.firstname"
                      :lastname="profile.lastname"
                      :role="profile.role"
                      :id="profile.id"
                      @toggle="toggleDeleteAccount()"></delete-account>
  </section>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

import General from './General.vue';
import Coordinator from './Coordinator.vue';
import Edit from './Edit.vue';
import EditPassword from './EditPassword.vue';
import Delete from './Delete.vue';

export default {
  data () {
    return {
      state: 'display'
    }
  },
  computed: {
    ...mapGetters([
      'profile'
    ])
  },
  methods: {
    toggleEdit() {
      switch (this.state) {
        case 'editProfile':
          this.state = 'display';
          break;
        default:
          this.state = 'editProfile';
          break;
      }
    },
    toggleEditPassword() {
      switch (this.state) {
        case 'editPassword':
          this.state = 'display';
          break;
        default:
          this.state = 'editPassword';
          break;
      }
    },
    toggleDeleteAccount() {
      switch (this.state) {
        case 'deleteAccount':
          this.state = 'display';
          break;
        default:
          this.state = 'deleteAccount';
          break;
      }
    },
    showDisplay() {
      this.state = 'display';
    }
  },
  components: {
    'coordinator-detail': Coordinator,
    'general-profile': General,
    'edit-profile': Edit,
    'edit-password': EditPassword,
    'delete-account': Delete
  },
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem('token')) {
      next((vm) => vm.$router.push('/'));
    }
    next();
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

button:focus, input[type="button"]:focus, .list-group-item {
  outline: none;
}
</style>