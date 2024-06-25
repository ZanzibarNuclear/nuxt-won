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

const { data: threadsData } = await useFetch('/api/threads')
if (threadsData.value?.threads) {
  allThreads.value = threadsData.value.threads
}

const allTopicsList = computed(() => {
  const topics = allThreads.value
    .filter((thread) => thread.public_key != wsy.activeThreadKey)
    .map((thread) => ({
      key: thread.public_key,
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
