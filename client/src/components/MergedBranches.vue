<template>
  <a-list bordered :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>{{ item }}</a-list-item>
    </template>
    <template #header>
      <div>{{ title }}</div>
    </template>
  </a-list>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
