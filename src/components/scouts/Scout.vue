<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4>{{ scout.firstname }} {{ scout.lastname }}</h4>
    </div>
    <div class="panel-body">
      <scout-detail :scout="scout"></scout-detail>
    </div>
  </div>
</template>

<script>
import Detail from './Detail.vue';

export default {
  props: {
    scout: {
      required: true,
      type: Object
    }
  },
  components: {
    'scout-detail': Detail
  }
}
</script>