<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <div class="btn-group pull-right">
        <button class="btn btn-default"
                @click="toggleEdit"
                data-toggle="tooltip" 
                data-placement="top" 
                title="Edit">
          <span class="glyphicon glyphicon-edit" aria-label="Edit"></span>
        </button>
        <button class="btn btn-danger"
                @click="deleteEvent"
                data-toggle="tooltip" 
                data-placement="top" 
                title="Delete">
          <span class="glyphicon glyphicon-trash" aria-label="Delete"></span>
        </button>
      </div>
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
    },
    deleteEvent() {
      return;
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