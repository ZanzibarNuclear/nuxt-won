<template>
  <div v-if="!wsy.activeThread">
    <h3>Of what shall we speak?</h3>
    <div class="my-6">
      <wsy-topic-form class="my-6" />
      <wsy-topic-select class="my-6" @open-topic="handleLoadTopic" />
    </div>
  </div>
  <div v-else>
    <div class="flex align-items-center">
      <div class="text-2xl grow">
        <span class="text-gray-700 font-bold">Topic:</span>
        {{ wsy.activeThread.topic }}
      </div>
      <div class="m-2">
        <UButton @click="openInviteForm" label="Invite someone to this topic" />
      </div>
      <div class="m-2">
        <UButton @click="doNewTopic">Change topics</UButton>
      </div>
    </div>
  </div>
  <UModal v-model="inviteOpen">
    <wsy-invite-friends />
    <UButton @click="closeInviteForm" icon="i-mdi-close" label="Close" />
  </UModal>
</template>

<script setup lang="ts">
const wsy = useWsyStore()

const newThreadTopic = ref('')
const topicInputRef = ref()
defineShortcuts({
  meta_f: () => {
    focusOnTopicInput()
  },
})
const focusOnTopicInput = () => {
  if (topicInputRef.value) {
    topicInputRef.value.$refs.input.focus()
  }
}

const inviteOpen = ref(false)
const openInviteForm = () => {
  inviteOpen.value = true
}
const closeInviteForm = () => {
  inviteOpen.value = false
}

onMounted(() => {
  focusOnTopicInput()
})

const handleLoadTopic = async (topicKey) => {
  navigateTo(`/wsy/threads/${topicKey}`)
  // console.log('thread', topicKey)
  // if (!topicKey) {
  //   console.log('Forgot to pick a topic?')

  //   return
  // }

  // const loadedThread = await $fetch(`/api/threads/${topicKey}`)
  // const loadedEntries = await $fetch(`/api/entries/${topicKey}`)
  // const writers = await $fetch(`/api/writers/${topicKey}`)

  // wsy.updateThread(loadedThread)
  // wsy.activateThread(loadedThread.public_key)
  // wsy.loadActiveEntries(loadedEntries)
  // wsy.loadWriters(writers)
}

const doNewTopic = () => {
  newThreadTopic.value = ''
  wsy.clearActiveThread()
}
</script>

<style lang="scss" scoped></style>
