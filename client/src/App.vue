<template>
   <button @click="sendMessage">sendMessage</button>
</template>

<script>
export default {
  data() {
    return {
      vscode: null
    }
  },
  mounted() {
    this.vscode = acquireVsCodeApi()
  },
  methods: {
    sendMessage() {
      this.vscode.postMessage('showLogs')
    }
  }
}
</script>
