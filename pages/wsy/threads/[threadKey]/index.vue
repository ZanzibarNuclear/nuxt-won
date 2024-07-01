<template>
  <h1>
    <UButton icon="i-mdi-arrow-left-top" class="mr-2" @click="onChangeTopic" />
    What Say You?
  </h1>
  <div>
    <div class="flex align-items-center">
      <div class="text-2xl grow">
        <span class="text-gray-700 font-bold">Topic:</span>
        {{ wsyStore.activeThread?.topic || 'Loading...' }}
      </div>
      <div class="m-2">
        <UButton @click="openInviteForm" label="Invite someone to this topic" />
      </div>
      <div class="m-2">
        <UButton @click="onChangeTopic">Change topics</UButton>
      </div>
    </div>
    <UModal v-model="inviteOpen" class="p-4">
      <wsy-invite-friends @cancel="closeInviteForm" />
    </UModal>
    <wsy-entries />
  </div>
</template>

<script setup lang="ts">
import { getWriter } from '~/db/WhatSayYouModel'

const route = useRoute()
const threadKey = route.params.threadKey
const wsyStore = useWsyStore()
const userContext = useUserStore()

const onChangeTopic = () => {
  wsyStore.clearActiveThread()
  navigateTo('/wsy')
}
const inviteOpen = ref(false)
const openInviteForm = () => {
  inviteOpen.value = true
}
const closeInviteForm = () => {
  inviteOpen.value = false
}

async function loadData() {
  // could be coming straight to thread - so load anything that might need to be
  if (!userContext.user) {
    userContext.loadUser()
  }
  if (threadKey) {
    const { data: wsyData, error } = await useAsyncData(
      `thread-${threadKey}`,
      async () => {
        const [thread, entries, writers, player] = await Promise.all([
          $fetch(`/api/say/threads/${threadKey}`),
          $fetch(`/api/say/entries/?threadKey=${threadKey}`),
          $fetch('/api/say/writers/'),
          getWriter(userContext.user.id),
        ])
        return { thread, entries, writers, player }
      }
    )
    if (error) {
      console.error(error.message)
      return
    }
    const { thread, entries, writers, player } = wsyData.value
    console.log(
      'returning thread and writer data',
      thread,
      entries,
      writers,
      player
    )
    userContext.setWsyWriter(player)
    wsyStore.loadActiveThread(thread)
    wsyStore.loadActiveEntries(entries)
    wsyStore.loadWriters(writers)
  } else {
    console.log('no particular topic')
  }
}
await loadData()
</script>

<style scoped></style>
