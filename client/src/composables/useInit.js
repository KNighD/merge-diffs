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
  const handleMessage = (message) => {
    if (message.code !== 0) {
      // TODO: show error
      return
    }
    const { type, data } = message.data
    switch (type) {
      case 'getBranches':
        branches.value = data
        break
      case 'showMergedBranches':
        firstMergedBranches.value = data[0]
        secondMergedBranches.value = data[1]
        break
    }
  }
  window.addEventListener('message', (event) => {
    const message = event.data
    handleMessage(message)
  })
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
