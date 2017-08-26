<template>
  <div class="loader-container">
    <centered-spinner></centered-spinner>
  </div>
</template>

<script>
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'

export default {
  components: {
    MoonLoader
  }
}
</script>


<style lang="scss" scoped>
.loader-container {
  margin-top: 15em;
}
</style>

