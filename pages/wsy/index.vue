<script setup lang="ts">
const wsy = useWsyStore()
const url = useRequestURL()

onBeforeMount(() => {
  const threadKey = url.searchParams.get('topic')
  if (threadKey) {
    // TODO: check if user is a player?
    handleChooseTopic(threadKey)
  }
})

const handleChooseTopic = async (threadKey: string) => {
  if (threadKey === null) return

  const loadedThread: Thread = await $fetch(`/api/threads/${threadKey}`)
  const loadedEntries = await $fetch(`/api/entries/${threadKey}`)

  wsy.updateThread(loadedThread)
  wsy.activateThread(loadedThread.public_key)
  wsy.loadActiveEntries(loadedEntries)
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
