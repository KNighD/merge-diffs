import { notification } from 'ant-design-vue'

export default function useReceiveMessage({
  firstMergedBranches,
  secondMergedBranches,
  branches,
}) {
  window.addEventListener('message', (event) => {
    const message = event.data
    if (message.code !== 0) {
      notification.open({
        message: 'Oops!',
        description: message.data
      })
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
  })
}
