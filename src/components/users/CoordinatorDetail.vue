<template>
<div>
  <h4>Coordinator Details</h4>
  <dl class="dl-horizontal">
    <dt>Troop:</dt><dd>{{ details.troop }}</dd>
    <dt>District:</dt><dd>{{ details.district }}</dd>
    <dt>Council:</dt><dd>{{ details.council }}</dd>
  </dl>
</div>
</template>

<script>

export default {
  props: {
    details: {
      type: Object,
      required: true
    }
  }
}
</script>