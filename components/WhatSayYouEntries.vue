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
  <div v-if="wsy.isActiveEntries">
    <div v-for="entry in entries" class="my-3">
      <WsyPostViewRow :entry="entry" :indent="indent" @reply="handleReply" />
      <div v-if="wsy.hasResponses(entry.id)">
        <div v-for="responseEntry in wsy.responseEntries(entry.id)">
          <WsyPostViewRow
            :entry="responseEntry"
            :indent="1"
            @reply="handleReply"
          />
        </div>
      </div>
    </div>
  </div>
  <UModal v-model="showReplyForm">
    <WhatSayYouEntryForm
      :responding-to="inResponseTo"
      @close="() => (showReplyForm = false)"
    />
    <UButton @click="showReplyForm = false" icon="i-mdi-close" label="Cancel" />
  </UModal>
</template>
