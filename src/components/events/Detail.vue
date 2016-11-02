<template>
  <div class="row">
    <div class="col-md-3">
      <strong>Date:</strong> {{ event.date | longDate }}
    </div>
    <div class="col-md-3">
      <strong>Registration Fee:</strong> ${{ event.price }}
    </div>
    <div class="col-md-3">
      <strong>Registration Open:</strong> {{ event.registration_open | longDate}}
    </div>
    <div class="col-md-3">
      <strong>Registration Close:</strong> {{ event.registration_close | longDate}}
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