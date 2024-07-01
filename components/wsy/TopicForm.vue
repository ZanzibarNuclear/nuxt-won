<template>
  <div>
    <UFormGroup label="Introduce a new topic">
      <div class="flex space-x-2">
        <UInput
          v-model="newThreadTopic"
          ref="topicInputRef"
          placeholder="Write the headline of what you want to discuss."
          class="flex-grow"
        />
        <UButton size="sm" @click="doStartThread">Start</UButton>
      </div>
    </UFormGroup>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['openTopic'])
const userContext = useUserStore()
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
  const newThread = await $fetch('/api/say/threads', {
    method: 'POST',
    body: {
      ownerId: userContext.wsyWriter?.id,
      topic: newThreadTopic.value,
    },
  })
  wsy.loadActiveThread(newThread)
  emit('openTopic', newThread.publicKey)
}
</script>

<style scoped></style>
