<template>
  <div class="container">
    <h1 class="title">Your Profile</h1>
    <h3 class="subtitle">View and make changes to your profile</h3>
    <div class="columns">
      <div class="column is-3">
        <aside class="menu">
          <p class="menu-label">Jump to a section</p>
          <ul class="menu-list">
            <li>
              <a href="#general-profile"
                 @click="showDisplay()">My Profile</a>
            </li>
            <li>
              <a href="#coordinator-details"
                 @click="showDisplay()">Details</a>
            </li>
          </ul>
          <p class="menu-label">Make changes to your account</p>
          <ul class="menu-list">
            <li>
              <a @click="toggleEdit()">
                {{ state === 'editProfile' ? 'Cancel Edits' : 'Edit Profile' }}
              </a>
            </li>
            <li>
              <a @click="toggleEditPassword()">
                {{ state === 'editPassword' ? 'Cancel Password Change' : 'Change Password' }}
              </a>
            </li>
            <li>
              <a @click="toggleDeleteAccount()">
                {{ state === 'deleteAccount' ? 'Don\'t Delete' : 'Delete My Account' }}
              </a>
            </li>
          </ul>
        </aside>
      </div>
      <div class="column">
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
        </div>
      </div>
    </div>
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