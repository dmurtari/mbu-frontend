<template>
  <div class="panel panel-default"
       :class="{ 'panel-info': currentEvent }">
    <div class="panel-heading">
      <div class="btn-group pull-right">
        <button class="btn btn-default"
                v-if="isAdmin"
                @click="toggleEdit"
                data-toggle="tooltip" 
                data-placement="top" 
                title="Edit">
          <span class="glyphicon glyphicon-edit" aria-label="Edit"></span>
        </button>
      </div>
      <h4>
        {{ event.semester }} {{ event.year }}
        <span v-if="currentEvent">(Current Event)</span>
      </h4>
    </div>
    <div class="panel-body">
      <event-detail v-if="!displayEditEvent" 
                    :event="event"></event-detail>
      <event-edit v-if="displayEditEvent"
                  @close="toggleEdit"
                  :event="event"></event-edit>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment'

import EventEdit from './Edit.vue';
import EventDetail from './Detail.vue';

export default {
  data() {
    return {
      displayEditEvent: false
    }
  },
  computed: {
    ...mapGetters([
      'isAdmin'
    ])
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    currentEvent: {
      type: Boolean
    }
  },
  methods: {
    toggleEdit() {
      this.displayEditEvent = !this.displayEditEvent;
    }
  },
  components: {
    'event-edit': EventEdit,
    'event-detail': EventDetail    
  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip();    
  }
}
</script>