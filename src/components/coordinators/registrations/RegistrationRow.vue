<template>
  <div>
    {{ scout.fullname }}
  </div>
</template>

<script>
export default {
  props: {
    scout: {
      type: Object,
      required: true
    }
  }
}
</script>