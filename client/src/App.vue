<template>
  <button @click="sendMessage">sendMessage</button>
</template>

<script>
export default {
  data() {
    return {
      vscode: null,
    }
  },
  mounted() {
    this.vscode = acquireVsCodeApi()
    window.addEventListener('message', (event) => {
      const message = event.data
      console.log(message)
    })
  },
  methods: {
    sendMessage() {
      this.vscode.postMessage('getLogs')
    },
  },
}
</script>
