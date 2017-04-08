<template>
  <div>
    <h4 v-if="isList"
        class="title is-4">All Classes</h4>
    <h4 v-else
        class="title is-4">
      <router-link to="/administration/classes/all">
        All Classes
      </router-link>
      /&nbspClass Detail
    </h4>
    <router-view></router-view>
  </div>
</template>

<script>
const listRegex = /.*all\/?$/

export default {
  computed: {
    isList() {
      return listRegex.test(this.$route.path);
    }
  }
}
</script>