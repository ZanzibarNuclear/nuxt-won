<template>
  <h1>
    <UButton icon="i-mdi-arrow-left-top" class="mr-2" @click="onChooseTopic" />
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
        <UButton @click="onChooseTopic">Change topics</UButton>
      </div>
    </div>
    <UModal v-model="inviteOpen" class="p-4">
      <wsy-invite-friends @cancel="closeInviteForm" />
    </UModal>
    <wsy-entries />
  </div>
</template>

<script setup lang="ts">
import { getParticipant } from '~/db/WsyModel'

// load entries
// handle new entries
// logic to invite others to respond
const route = useRoute()
const threadKey = route.params.threadKey
const wsyStore = useWsyStore()
const userContext = useUserStore()

const onChooseTopic = () => {
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

if (threadKey) {
  const { data: wsyData, error } = await useAsyncData(
    `thread-${threadKey}`,
    async () => {
      const [thread, entries, writers, participant] = await Promise.all([
        $fetch(`/api/threads/${threadKey}`),
        $fetch(`/api/entries/${threadKey}`),
        $fetch(`/api/writers/${threadKey}`),
        getParticipant(),
      ])
      return { thread, entries, writers, participant }
    }
  )
  const { thread, entries, writers, participant } = wsyData.value
  console.log(
    'returning thread and writer data',
    thread,
    entries,
    writers,
    participant
  )
  userContext.setPlayer(participant)
  wsyStore.updateThread(thread)
  wsyStore.loadActiveEntries(entries)
  wsyStore.loadWriters(writers)
  wsyStore.activateThread(threadKey)
} else {
  console.log('no particular topic')
}
</script>

<style scoped></style>
