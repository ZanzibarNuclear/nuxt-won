<script setup lang="ts">
const supabase = useSupabaseClient()
const wsy = useWsyStore()
const newThreadTopic = ref('')

const inviteOpen = ref(false)

const canStartTopic = computed(() => {
  return newThreadTopic.value || newThreadTopic.value.trim() !== ''
})

const doStartThread = async () => {
  console.log('doStartThread')
  if (!wsy.isPlayerLoaded || !canStartTopic.value) {
    console.log('Not ready to start thread')
    return
  }

  const { data, error } = await supabase
    .from('wsy_threads')
    .insert({
      owner_id: wsy.player.id,
      public_key: genKey(),
      topic: newThreadTopic.value,
    })
    .select()

  if (error) {
    console.error('Unable to start topic', error)
    return
  }
  wsy.updateThread(data[0])
  wsy.activateThread(data[0].public_key)
}

const doNewTopic = () => {
  newThreadTopic.value = ''
  wsy.clearActiveThread()
}
</script>

<template>
  <div v-if="!wsy.activeThread">
    <h3>Of what shall we speak?</h3>
    <div class="columns-2 my-6">
      <div>
        <UFormGroup label="New Topic">
          <UInput v-model="newThreadTopic" />
        </UFormGroup>
        <UButton class="mt-2" @click="doStartThread" :disabled="!canStartTopic"
          >Start this topic</UButton
        >
      </div>
      <WhatSayYouTopicSelect />
    </div>
  </div>
  <div v-else>
    <div class="flex align-items-center">
      <div class="text-2xl grow">
        <span class="text-gray-700 font-bold">Topic:</span>
        {{ wsy.activeThread.topic }}
      </div>
      <div class="m-2">
        <UButton
          @click="() => (inviteOpen = true)"
          label="Invite someone to this topic"
        />
      </div>
      <div class="m-2">
        <UButton @click="doNewTopic">Change topics</UButton>
      </div>
    </div>
  </div>
  <UModal v-model="inviteOpen">
    <WhatSayYouInviteFriends />
    <UButton
      @click="() => (inviteOpen = false)"
      icon="i-mdi-close"
      label="Close"
    />
  </UModal>
</template>
