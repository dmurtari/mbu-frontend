<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4>{{ event.semester }} {{ event.year }}</h4>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-4">
          <strong>Date:</strong> {{ event.date }}
        </div>
        <div class="col-md-4">
          <strong>Registration Open:</strong> {{ event.registration_open }}
        </div>
        <div class="col-md-4">
          <strong>Registration Close:</strong> {{ event.registration_close }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>