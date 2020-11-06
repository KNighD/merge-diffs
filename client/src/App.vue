<template>
  <div>当前分支：{{ currentBranch }}</div>
  <a-button type="primary">
    Primary
  </a-button>
  <button @click="getLogs">getLogs</button>
</template>

<script>
export default {
  data() {
    return {
      vscode: null,
      currentBranch: '',
    }
  },
  mounted() {
    this.vscode = acquireVsCodeApi()
    this.getCurrentBranch()
    // 监听来自 vscode 插件的信息
    window.addEventListener('message', (event) => {
      const message = event.data
      this.handleMessage(message)
    })
  },
  methods: {
    getLogs() {
      this.vscode.postMessage('getLogs')
    },
    getCurrentBranch() {
      this.vscode.postMessage('getCurrentBranch')
    },
    handleMessage(message) {
      if(message.code !== 0) {
        // TODO: show error
        return;
      }
      const { type, data } = message.data
      switch(type) {
        case 'getLogs':
          break;
        case 'getCurrentBranch':
          this.currentBranch = data
          break;
      }
    },
  },
}
</script>
