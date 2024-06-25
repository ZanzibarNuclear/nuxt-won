<template>
  <h1>
    <UButton
      icon="i-mdi-arrow-left-top"
      class="mr-2"
      @click="onChooseTopic"
    />What Say You?
  </h1>
  <div>
    <wsy-entries />
  </div>
</template>

<script setup lang="ts">
// load entries
// handle new entries
// logic to invite others to respond
const route = useRoute()
const threadKey = route.params.threadKey
const wsyStore = useWsyStore()

const onChooseTopic = () => {
  navigateTo('/wsy')
}

if (threadKey) {
  const { data: wsyData, error } = await useAsyncData(
    `thread-${threadKey}`,
    async () => {
      const [thread, entries, writers] = await Promise.all([
        $fetch(`/api/threads/${threadKey}`),
        $fetch(`/api/entries/${threadKey}`),
        $fetch(`/api/writers/${threadKey}`),
      ])
      console.log('returning thread and writer data', thread, entries, writers)
      return { thread, entries, writers }
    }
  )
  const { thread, entries, writers } = wsyData.value
  wsyStore.updateThread(thread)
  wsyStore.loadActiveEntries(entries)
  wsyStore.loadWriters(writers)
  wsyStore.activateThread(threadKey)
} else {
  console.log('no particular topic')
}
</script>

<style scoped></style>
