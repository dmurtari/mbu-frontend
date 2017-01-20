<template>
  <div class="container">
    <h3 class="title is-3">Event Administration</h3>
    <h5 class="subtitle is-5">
      Manage and make changes to all merit badge events, such as badges offered
      at events, as well as users of this website.
    </h5>
    <div class="columns">
      <div class="column is-3">
        <aside class="menu">
          <p class="menu-label">Jump to a section</p>
          <ul class="menu-list">
            <a href="#" @click="display('offerings')">Manage Offerings</a>
            <a href="#" @click="display('users')">Manage Users</a>
          </ul>
        </aside>
      </div>
      <div class="column">
        <offerings v-if="displayed === 'offerings'"></offerings>
        <users v-if="displayed === 'users'"></users>
      </div>
    </div>
  </div>
</template>

<script>
import Offerings from './offerings/List.vue';
import Users from './users/List.vue';

export default {
  data() {
    return {
      displayed: 'offerings'
    };
  },
  methods: {
    display(newDisplay) {
      this.displayed = newDisplay;
    }
  },
  components: {
    'offerings': Offerings,
    'users': Users
  }
}
</script>