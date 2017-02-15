<template>
  <div class="box">
    <h5 class="title is-5">{{ purchasable.item }}</h5>
    <detail v-if="!editing"
            :purchasable="purchasable"></detail>
  </div>
</template>

<script>
import Detail from './Detail.vue';

export default {
  props: {
    purchasable: {
      type: Object,
      required: true
    },
    eventId: { required: true }
  },
  data() {
    return {
      editing: false
    };
  },
  components: {
    Detail
  }
}
</script>