import { ref } from 'vue'

export default function useInit() {
  if (!window.acquireVsCodeApi) {
    return {}
  }
  const vscode = window.acquireVsCodeApi()
  vscode.postMessage(JSON.stringify({ type: 'getBranches' }))
  const branches = ref([])
  const firstBranch = ''
  const secondBranch = ''
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
        console.log(data)
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
        data: [firstBranch, secondBranch],
      })
    )
  }
  return {
    branches,
    firstBranch,
    secondBranch,
    submit,
  }
}
