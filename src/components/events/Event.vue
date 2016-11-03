<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <button class="btn btn-default pull-right"
              @click="toggleEdit"
              data-toggle="tooltip" 
              data-placement="left" 
              title="Toggle editing this event">
        <span class="glyphicon glyphicon-edit" aria-label="Edit"></span>
      </button>
      <h4>{{ event.semester }} {{ event.year }}</h4>
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
import moment from 'moment'

import EventEdit from './Edit.vue';
import EventDetail from './Detail.vue';

const dateFormat = 'dddd, MMMM Do YYYY'

export default {
  data() {
    return {
      displayEditEvent: false
    }
  },
  props: {
    event: {
      type: Object,
      required: true
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