<template>
  <div class="container">
    <h3 class="title is-3">Troop Administration</h3>
    <h5 class="subtitle is-5">
      Manage scouts in your troop. Add and edit existing scouts, register
      scouts for Merit Badge University events, and view their completion
      records.
    </h5>
    <div class="columns">
      <div class="column is-3">
        <aside class="menu">
          <p class="menu-label">Jump to a Section</p>
          <ul class="menu-list">
            <a href="#" @click="display('scouts')">Manage Scouts</a>
            <a href="#" @click="display('registrations')">Event Registrations</a>
          </ul>
        </aside>
      </div>
      <div class="column">
        <scouts v-if="displayed === 'scouts'"></scouts>
        <registrations v-if="displayed === 'registrations'"></registrations>
      </div>
    </div>
  </div>
</template>

<script>
import Registrations from './registrations/List.vue';
import Scouts from './scouts/List.vue';

export default {
  data() {
    return {
      displayed: 'scouts'
    };
  },
  methods: {
    display(newDisplay) {
      this.displayed = newDisplay;
    }
  },
  components: {
    'registrations': Registrations,
    'scouts': Scouts,
  }
}
</script>