<template>
  <div class="columns">
    <div class="column is-2">
      <b>{{ badge }}</b>
      <button class="button titlebar-button is-light is-pulled-right is-hidden-tablet"
              data-balloon="Toggle Details"
              @click="emitExpand()"
              :disabled="assignees.length < 1">
        <span class="icon is-small">
          <i class="fa fa-plus"></i>
        </span>
      </button>
      <div class="info class-detail">
        <p>
          {{ duration }} {{ duration === 1 ? 'period' : 'periods '}}
        </p>
        <p>
          {{ assignees.length }}
          {{ assignees.length === 1 ? 'scout' : 'scouts' }}
        </p>
      </div>
    </div>
    <div v-for="n in 3" class="column auto">
      <div>
        <b :class="{ 'is-light': scoutsForPeriod(n) < 1 }">
          Period {{ n }}
        </b>
        <span v-if="scoutsForPeriod(n).length > 0" >
          <p class="info">
            {{ scoutsForPeriod(n).length }}
            {{ scoutsForPeriod(n).length === 1 ? 'scout' : 'scouts' }}
          </p>
        </span>
      </div>
    </div>
    <div class="column is-1 is-hidden-mobile">
      <button class="button is-white"
              data-balloon="Toggle Details"
              @click="emitExpand()"
              :disabled="assignees.length < 1">
        <span class="icon is-small">
          <i class="fa fa-plus"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import GenericRow from './GenericRow.vue';

export default {
  extends: GenericRow,
  methods: {
    emitExpand() {
      this.$emit('expand')
    }
  }
}
</script>

<style scoped lang="sass">
  b.is-light {
    color: lightgray;
  }

  .info {
    color: #888;
  }
</style>