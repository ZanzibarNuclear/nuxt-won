<script setup lang="ts">
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

<template>
  <div>
    <h1>What Say You?</h1>
    <WhatSayYouHeader />
    <WhatSayYouTopic v-if="wsy.isPlayerLoaded" />
    <WhatSayYouEntries v-if="wsy.isActiveThread" />
  </div>
</template>
