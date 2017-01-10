<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <div class="btn-group pull-right">
        <button class="btn btn-default"
                @click="toggleEdit()"
                data-toggle="tooltip" 
                data-placement="top" 
                title="Edit">
          <span class="glyphicon glyphicon-edit" aria-label="Edit"></span>
        </button>
      </div>
      <h4>
        {{ scout.firstname }} {{ scout.lastname }}
      </h4>
    </div>
    <div class="panel-body">
      <scout-detail v-if="!editing" :scout="scout"></scout-detail>
      <scout-edit v-if="editing" :scout="scout"></scout-edit>
    </div>
  </div>
</template>

<script>
import Detail from './Detail.vue';
import Edit from './Edit.vue';

export default {
  props: {
    scout: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      editing: false
    };
  },
  methods: {
    toggleEdit() {
      this.editing = !this.editing;
    }
  },
  components: {
    'scout-detail': Detail,
    'scout-edit': Edit
  }
}
</script>