<template>
  <div class="container">
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
    <MergedBranches :data="firstList" :title="firstBranch" />
    <MergedBranches :data="secondList" :title="secondBranch" />
    <MergedBranches class="intersection-list" :data="intersectionList" title="共同合并的分支" />
  </div>
</template>

<script>
import BranchSelector from '/@/components/BranchSelector.vue'
import MergedBranches from '/@/components/MergedBranches.vue'
import useInit from '/@/composables/useInit'
import intersection from 'lodash/intersection'
import without from 'lodash/without'

export default {
  components: {
    BranchSelector,
    MergedBranches,
  },
  setup() {
    const {
      branches,
      firstBranch,
      secondBranch,
      submit,
      firstMergedBranches,
      secondMergedBranches,
    } = useInit()
    return {
      branches,
      firstBranch,
      secondBranch,
      submit,
      firstMergedBranches,
      secondMergedBranches,
    }
  },
  computed: {
    intersectionList() {
      return intersection(this.firstMergedBranches, this.secondMergedBranches)
    },
    firstList() {
      return without(this.firstMergedBranches, ...this.intersectionList)
    },
    secondList() {
      return without(this.secondMergedBranches, ...this.intersectionList)
    }
  }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 400px 400px 100px;
  grid-row-gap: 20px;
  grid-column-gap: 10px;
}
.intersection-list {
  grid-column-start: 1;
  grid-column-end: 3; 
}
</style>
