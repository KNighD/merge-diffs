import { ref } from 'vue'

export default function useInit() {
  if (!window.acquireVsCodeApi) {
    return {}
  }
  const vscode = window.acquireVsCodeApi()
  vscode.postMessage(JSON.stringify({ type: 'getBranches' }))
  const branches = ref([])
  const firstBranch = ref('')
  const secondBranch = ref('')
  const firstMergedBranches = ref([])
  const secondMergedBranches = ref([])
  const submit = () => {
    vscode.postMessage(
      JSON.stringify({
        type: 'showMergedBranches',
        data: [firstBranch.value, secondBranch.value],
      })
    )
  }
  return {
    branches,
    firstBranch,
    secondBranch,
    submit,
    firstMergedBranches,
    secondMergedBranches,
  }
}
