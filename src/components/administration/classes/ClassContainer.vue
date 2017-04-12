<template>
  <div>
    <h4 v-if="isList"
        class="title is-4">All Classes</h4>
    <h4 v-else
        class="title is-4">
      <router-link to="/administration/classes/all">
        All Classes
      </router-link>
      /&nbsp{{ title }}
    </h4>
    <router-view @title="setTitle($event)"></router-view>
  </div>
</template>

<script>
const listRegex = /.*all\/?$/

export default {
  data() {
    return {
      title: 'Class Details'
    };
  },
  computed: {
    isList() {
      return listRegex.test(this.$route.path);
    }
  },
  methods: {
    setTitle(title) {
      this.title = title;
    }
  }
}
</script>