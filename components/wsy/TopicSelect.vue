<template>
  <div v-if="allTopicsList.length > 0">
    <UFormGroup label="Pick one of these topics">
      <div class="flex space-x-2">
        <USelect
          v-model="selectedTopic"
          :options="allTopicsList"
          option-attribute="topic"
          value-attribute="key"
          class="flex-grow"
        />
        <UButton size="sm" @click="onChooseSelectedTopic">Open</UButton>
      </div>
    </UFormGroup>
  </div>
</template>

<script setup lang="ts">
const wsy = useWsyStore()
const allThreads = ref([])
const selectedTopic = ref('')
const emit = defineEmits(['openTopic'])

async function loadData() {
  const threads = await $fetch('/api/say/threads')
  if (threads) {
    threads.forEach((thread) => allThreads.value.push(thread))
  }
}
await loadData()

const allTopicsList = computed(() => {
  const topics = allThreads.value
    .filter((thread) => thread.publicKey != wsy.activeThreadKey)
    .map((thread) => ({
      key: thread.publicKey,
      topic: thread.topic,
    }))
  return topics
})

const onChooseSelectedTopic = () => {
  console.log(selectedTopic.value)

  if (selectedTopic.value !== null) {
    emit('openTopic', selectedTopic.value)
  }
}
</script>
