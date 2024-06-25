<template>
  <div>
    <h1>What Say You?</h1>
    <div v-if="!viewHeader">
      <UButton @click="viewHeader = true" icon="i-ph-eye" :label="who" />
    </div>
    <div v-else>
      <wsy-header @close="closeHeader" />
    </div>
    <wsy-topic v-if="wsyStore.isPlayerLoaded" />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'World of Nuclear - What Say You?',
  ogTitle: 'World of Nuclear - What Say You?',
  description:
    'Discussion forum to talk about beneficial aspects of nuclear energy. Read what others have to say, and respond with your own ideas.',
  ogDescription:
    'Discussion forum to talk about beneficial aspects of nuclear energy. Read what others have to say, and respond with your own ideas.',
  ogImage: 'https://worldofnuclear.com/speech-bubbles.png',
  twitterCard: 'summary',
})

const url = useRequestURL()
const wsyStore = useWsyStore()

const viewHeader = ref(false)

const threadKey = url.searchParams.get('topic')
console.log('looking for topic', threadKey)

const who = computed(() => {
  if (wsyStore.isPlayerLoaded) {
    return wsyStore.player.alias
  }
  return 'Who are you?'
})

const closeHeader = () => {
  viewHeader.value = false
}
</script>
