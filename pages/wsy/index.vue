<template>
  <div>
    <h1>What Say You?</h1>
    <WsyHeader />
    <WsyTopic v-if="wsyStore.isPlayerLoaded" />
    <WsyEntries v-if="wsyStore.isActiveThread" />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'World of Nuclear - What Say You?',
  ogTitle: 'World of Nuclear - What Say You?',
  description:
    'Discussion forum to talk about beneficial aspects of nuclear energy. Read what others have to say, and respond with your own ideas.',
  ogDescription:
    'Discussion forum to talk about beneficial aspects of nuclear energy. Read what others have to say, and respond with your own ideas.',
  ogImage: 'https://worldofnuclear.com/Diable-Canyon-power-plant.png',
  twitterCard: 'summary',
})

const url = useRequestURL()
const wsyStore = useWsyStore()

const threadKey = url.searchParams.get('topic')
console.log('looking for topic', threadKey)

if (threadKey) {
  const { data: wsy, error } = await useAsyncData(
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
  wsyStore.updateThread(wsy.value.thread)
  wsyStore.loadActiveEntries(wsy.value.entries)
  wsyStore.loadWriters(wsy.value.writers)
  wsyStore.activateThread(threadKey)
} else {
  console.log('no particular topic')
}
</script>
