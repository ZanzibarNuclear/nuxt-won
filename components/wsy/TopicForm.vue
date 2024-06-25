<template>
  <div>
    <UFormGroup label="Introduce a new topic">
      <div class="flex space-x-2">
        <UInput
          v-model="newThreadTopic"
          ref="topicInputRef"
          placeholder="Enter a topic here..."
          class="flex-grow"
        />
        <UButton size="sm" @click="doStartThread">Start</UButton>
      </div>
    </UFormGroup>
  </div>
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

onMounted(() => {
  focusOnTopicInput()
})

const doStartThread = async () => {
  if (newThreadTopic.value === '') {
    return
  }
  const supabase = useSupabaseClient()
  const { data, error } = await supabase
    .from('wsy_threads')
    .insert({
      owner_id: wsy.player.id,
      public_key: genKey(),
      topic: newThreadTopic.value,
    })
    .select()

  if (error) {
    console.error('Trouble starting topic', error)
    return
  }
  wsy.updateThread(data[0])
  wsy.activateThread(data[0].public_key)
}
</script>

<style scoped></style>
