<template>
  <ClientOnly>
    <ContentRenderer v-if="chosen" :value="chosen" />
  </ClientOnly>
</template>

<script lang="ts" setup>
import { EventRepository } from '~/api/wonService/EventRepo'
const chosen = ref()
const loadReason = async () => {
  const { data } = await useAsyncData('join-pages', () => {
    return queryCollection('join').where('path', 'LIKE', '/join/reasons/%').all()
  })
  if (!data.value || !data.value.length) {
    console.log('nothing found')
    return
  }
  const numReasons = data.value ? data.value.length : 0
  console.log(`chosen reason: ${numReasons}`)

  const index = Math.floor(Math.random() * numReasons)
  chosen.value = data.value ? data.value[index] : null
  if (chosen.value) {
    EventRepository.logJoinCta(chosen.value._path)
  }
}
await loadReason()
</script>

<style></style>
