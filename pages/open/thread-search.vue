<template>
  <div>
    <p v-for="thread in threads">
      <NuxtLink :to="loadTopic(thread.publicKey)">{{ thread.topic }}</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
let threads = ref([])

async function loadData() {
  const loadedThreads = await $fetch('/api/say/threads')
  if (loadedThreads) {
    loadedThreads.forEach((thread) => threads.value.push(thread))
  }
}
await loadData()

const loadTopic = (topicKey) => {
  navigateTo(`/wsy/threads/${topicKey}`)
}
</script>

<style scoped></style>
