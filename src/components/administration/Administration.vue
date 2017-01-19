<template>
  <div class="container">
    <h1 class="title">Event Administration</h1>
    <h3 class="subtitle">Manage Merit Badge University events</h3>
    <div class="columns">
      <div class="column is-3">
        <aside class="menu">
          <p class="menu-label">Jump to a section</p>
          <ul class="menu-list">
            <a href="#">Manage Offerings</a>
          </ul>
        </aside>
      </div>
      <div class="column">
        <offerings></offerings>
      </div>
    </div>
  </div>
</template>

<script>
import Offerings from './offerings/List.vue';

export default {
  components: {
    'offerings': Offerings
  }
}
</script>