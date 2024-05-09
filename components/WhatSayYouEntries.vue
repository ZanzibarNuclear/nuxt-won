<script setup lang="ts">
const wsy = useWsyStore()

defineProps(['entries', 'indent'])
const showReplyForm = ref(false)
const inResponseTo = ref()

const handleReply = (entryId: number) => {
  inResponseTo.value = entryId
  showReplyForm.value = true
}
</script>

<template>
  <WhatSayYouEntryForm />
  <WsyViewRecursive
    :entries="wsy.topLevelEntries"
    :indent="0"
    @reply="handleReply"
  />
  <UModal v-model="showReplyForm">
    <WhatSayYouEntryForm
      :responding-to="inResponseTo"
      @close="() => (showReplyForm = false)"
    />
    <UButton @click="showReplyForm = false" icon="i-mdi-close" label="Cancel" />
  </UModal>
</template>
