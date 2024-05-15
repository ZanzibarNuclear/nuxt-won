<template>
  <div>
    <h1>What Say You?</h1>
    <WsyHeader />
    <WsyTopic v-if="wsy.isPlayerLoaded" />
    <WsyEntries v-if="wsy.isActiveThread" />
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

const wsy = useWsyStore()
const url = useRequestURL()

onBeforeMount(() => {
  const threadKey = url.searchParams.get('topic')
  if (threadKey) {
    // TODO: check if user is a player?
    console.log('loading topic from params')
    handleChooseTopic(threadKey)
  } else {
    console.log('no topic found in params')
  }
})

const handleChooseTopic = async (threadKey: string) => {
  if (threadKey === null) return

  const loadedThread = await $fetch(`/api/threads/${threadKey}`)
  const loadedEntries = await $fetch(`/api/entries/${threadKey}`)
  const writers = await $fetch(`/api/writers/${threadKey}`)

  wsy.updateThread(loadedThread)
  wsy.activateThread(loadedThread.public_key)
  wsy.loadActiveEntries(loadedEntries)
  wsy.loadWriters(writers)
}
</script>
