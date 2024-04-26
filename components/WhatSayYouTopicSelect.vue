<script setup lang="ts">
const wsy = useWsyStore()
const allThreads = ref([])
const chosenTopic = ref('')

const { data: threadsData } = await useFetch('/api/threads')

onMounted(async () => {
  if (threadsData.value?.threads) {
    console.log('loaded thread info')
    allThreads.value = threadsData.value.threads
  }
})

const allTopicsList = computed(() => {
  console.log('build list of topics')
  const topics = allThreads.value
    .filter((thread) => thread.public_key != wsy.activeThreadKey)
    .map((thread) => ({
      key: thread.public_key,
      topic: thread.topic,
    }))
  return topics
})

const doChooseTopic = async () => {
  if (chosenTopic.value === null) return

  const loadedThread = await $fetch(`/api/threads/${chosenTopic.value}`)

  const loadedEntries = await $fetch(`/api/entries/${loadedThread.public_key}`)

  wsy.updateThread(loadedThread)
  wsy.activateThread(loadedThread.public_key)

  // TODO: load thread entries
  // wsy.updateEntries(threadKey)
}
</script>

<template>
  <div v-if="allTopicsList.length > 0" class="my-4">
    <UFormGroup label="Pick another topic">
      <USelect
        v-model="chosenTopic"
        :options="allTopicsList"
        option-attribute="topic"
        value-attribute="key"
      />
    </UFormGroup>
    <UButton class="mt-2" @click="doChooseTopic">Change topics</UButton>
  </div>
</template>
