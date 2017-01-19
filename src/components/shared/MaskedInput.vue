<template>
  <input ref="input"
         class="input"
         type="String"
         :placeholder="placeholder"
         :data-mask="mask"
         :value="value"
         :disabled="disabled"
         @keyup="updateValue($event.target.value)">
</template>

<script>
export default {
  props: {
    value: {
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateValue(value) {
      this.$emit('input', $(this.$refs.input).val());
    }
  }
}
</script>