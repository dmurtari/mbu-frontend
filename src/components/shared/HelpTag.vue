<template>
  <span class="icon question-icon"
        :data-balloon="text"
        data-balloon-pos="up"
        :data-balloon-length="length">
      <span class="fa fa-question-circle">
      </span>
  </span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    length: {
      type: String,
      default: 'large'
    }
  }
}
</script>

<style lang="scss" scoped>
  .question-icon:hover {
    cursor: pointer
  }
</style>
