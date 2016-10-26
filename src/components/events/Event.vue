<template>
  <div class="panel panel-default">
    <div class="panel-headering">{{ event.semester }} {{ event.year }}</div>
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