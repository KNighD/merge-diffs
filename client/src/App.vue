<template>
   <button @click="sendMessage">sendMessage</button>
</template>

<script>
export default {
  methods: {
    sendMessage() {
      console.log('message')
    }
  }
}
</script>
