<script setup lang="ts">
const wsy = useWsyStore()
const allThreads = ref([])
const chosenTopic = ref('')

const { data: threadsData } = await useFetch('/api/threads')

onMounted(async () => {
  if (threadsData.value?.threads) {
    allThreads.value = threadsData.value.threads
  }
})

const allTopicsList = computed(() => {
  const topics = allThreads.value
    .filter((thread) => thread.public_key != wsy.activeThreadKey)
    .map((thread) => ({
      key: thread.public_key,
      topic: thread.topic,
    }))
  return topics
})

const doChooseTopic = async () => {
  // TODO: have this emit and let parent handle
  if (chosenTopic.value === null) return

  const loadedThread = await $fetch(`/api/threads/${chosenTopic.value}`)
  const loadedEntries = await $fetch(`/api/entries/${chosenTopic.value}`)

  wsy.updateThread(loadedThread)
  wsy.activateThread(loadedThread.public_key)
  wsy.loadActiveEntries(loadedEntries)
}
</script>

<template>
  <div v-if="allTopicsList.length > 0">
    <UFormGroup label="Pick one of these topics">
      <USelect
        v-model="chosenTopic"
        :options="allTopicsList"
        option-attribute="topic"
        value-attribute="key"
      />
    </UFormGroup>
    <UButton class="mt-2" @click="doChooseTopic" :disabled="!chosenTopic"
      >Open</UButton
    >
  </div>
</template>
