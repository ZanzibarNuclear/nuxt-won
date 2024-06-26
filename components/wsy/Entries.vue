<template>
  <wsy-entry-form v-if="showEntryForm" @close="showEntryForm = false" />
  <div v-else>
    Say something about this topic.
    <UButton
      icon="i-mdi-edit"
      size="xs"
      label="Start"
      @click="showEntryForm = true"
    />
  </div>
  <wsy-view-recursive :entries="wsy.topLevelEntries" :indent="0" />
</template>

<script setup lang="ts">
const wsy = useWsyStore()
const showEntryForm = ref(false)
</script>
