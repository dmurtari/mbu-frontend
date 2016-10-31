<template>
<div>
  <input ref="input"
         class="form-control"
         type="String"
         :placeholder="placeholder"
         :data-mask="mask"
         :value="value"
         @keyup="updateValue($event.target.value)">
</div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    mask: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'String'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateValue(value) {
      this.$emit('input', $(this.$refs.input).val());
    }
  }
}
</script>