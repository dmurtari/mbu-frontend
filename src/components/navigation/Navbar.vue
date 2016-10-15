<template>
  <nav class="navbar navbar-default">
    <div class="container">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">MBU Online</router-link>
      </div>
      <ul class="nav navbar-nav">
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/events">Events</router-link></li>
      </ul>        
      <ul class="nav navbar-nav navbar-right">
        <li v-if="user.authenticated">
          <a href="#" @click="logout">Logout</a>
        </li>
        <li v-if="!user.authenticated"
            class="dropdown">
          <a href="#"
             class="dropdown-toggle"
             data-toggle="dropdown"
             role="button"
             aria-haspopup="true"
             aria-expanded="false">Login/Signup <span class="caret"></span></a>
          <ul v-on:click.stop
              class="dropdown-menu">
            <li><signin></signin></li>
          </ul>
        </li>          
      </ul>
    </div>
  </nav>
</template>

<script>
import auth from '../../services/auth';
import Signin from '../authentication/Signin.vue';

export default {
  data() {
    return {
      user: auth.user
    }
  },
  methods: {
    logout() {
      auth.logout();
    }
  },
  components: {
    'signin': Signin
  }
}
</script>