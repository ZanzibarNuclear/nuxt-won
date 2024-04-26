<script setup lang="ts">
const supabase = useSupabaseClient()
const wsy = useWsyStore()
const newThreadTopic = ref('')

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
  <div class="my-6" v-if="!wsy.activeThread">
    <div>Of what shall we speak?</div>
    <UFormGroup label="Topic" description="What you intend to talk about">
      <UInput v-model="newThreadTopic" />
    </UFormGroup>
    <UButton class="mt-2" @click="doStartThread" :disabled="!canStartTopic"
      >Start a Topic</UButton
    >
    <WhatSayYouTopicSelect />
  </div>
  <div v-if="wsy.activeThread">
    <h2>
      We are talking about:
      <span class="text-primary">{{ wsy.activeThread.topic }}</span>
    </h2>
    <WhatSayYouInviteFriends />
    <div class="my-4">
      <UButton @click="doNewTopic">Change topics</UButton>
    </div>
  </div>
</template>
