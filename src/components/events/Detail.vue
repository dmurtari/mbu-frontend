<template>
  <div class="row">
    <div class="col-md-3">
      <strong>Date:</strong> {{ event_date }}
    </div>
    <div class="col-md-3">
      <strong>Registration Open:</strong> {{ event_open }}
    </div>
    <div class="col-md-3">
      <strong>Registration Close:</strong> {{ event_close }}
    </div>
    <div class="col-md-3">
      <strong>Registration Fee:</strong> ${{ event.price }}
    </div>
  </div>
</template>

<script>
import moment from 'moment'

const dateFormat = 'dddd, MMMM Do YYYY'

export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    event_date() {
      return moment(this.event.date).format(dateFormat)
    },
    event_open() {
      return moment(this.event.registration_open).format(dateFormat)
    },
    event_close() {
      return moment(this.event.registration_close).format(dateFormat)
    }
  }
}
</script>