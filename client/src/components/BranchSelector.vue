<template>
  <a-select
    :value="value"
    show-search
    placeholder="选择一个分支"
    option-filter-prop="children"
    style="width: 200px"
    :filter-option="filterOption"
    @change="handleChange"
  >
    <a-select-option v-for="branch in branches" :key="branch" :value="branch">
      {{ branch }}
    </a-select-option>
  </a-select>
</template>

<script>
export default {
  props: {
    branches: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: ''
    },
  },
   emits: ['change-branch'],
  methods: {
    filterOption(input, option) {
      return option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
    handleChange(value) {
      this.$emit('change-branch', value)
    }
  }
}
</script>
