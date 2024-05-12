<script setup lang="ts">
const wsy = useWsyStore()

defineProps(['entries', 'indent'])
const showEntryForm = ref(false)
</script>

<template>
  <WsyEntryForm v-if="showEntryForm" @close="showEntryForm = false" />
  <div v-else>
    Say something about this topic.
    <UButton
      icon="i-mdi-edit"
      size="xs"
      label="Start"
      @click="showEntryForm = true"
    />
  </div>
  <WsyViewRecursive :entries="wsy.topLevelEntries" :indent="0" />
</template>
