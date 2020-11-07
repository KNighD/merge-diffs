<template>
  <BranchSelector
    :branches="branches"
    :value="firstBranch"
    @change-branch="
      (value) => {
        firstBranch = value
      }
    "
  />
  <BranchSelector
    :branches="branches"
    :value="secondBranch"
    @change-branch="
      (value) => {
        secondBranch = value
      }
    "
  />
  <a-button type="primary" @click="submit">提交</a-button>
</template>

<script>
import BranchSelector from '/@/components/BranchSelector.vue'
import useInit from '/@/composables/useInit'

export default {
  components: {
    BranchSelector,
  },
  setup() {
    const { branches, firstBranch, secondBranch, submit } = useInit()
    return { branches, firstBranch, secondBranch, submit }
  },
  methods: {
    handleChange(value) {
      this.firstBranch = value
    },
  },
}
</script>
