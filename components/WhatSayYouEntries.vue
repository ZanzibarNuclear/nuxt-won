<script setup lang="ts">
const wsy = useWsyStore()

const showReplyForm = ref(false)
const inResponseTo = ref()

const handleReply = (entryId) => {
  inResponseTo.value = entryId
  showReplyForm.value = true
}
</script>

<template>
  <WhatSayYouEntryForm />
  <ul v-if="wsy.isActiveEntries">
    <li v-for="item in wsy.topLevelEntries" class="my-3">
      <WhatSayYouEntryView :entry="item" @reply="handleReply" />
      <div v-if="wsy.hasResponses(item.id)">
        <div v-for="responseEntry in wsy.responseEntries(item.id)">
          <WsyPostViewRow :entry="responseEntry" @reply="handleReply" />
          <WhatSayYouEntryView
            :entry="responseEntry"
            :indent="1"
            @reply="handleReply"
          />
        </div>
      </div>
    </li>
  </ul>
  <UModal v-model="showReplyForm">
    <WhatSayYouEntryForm
      :responding-to="inResponseTo"
      @close="() => (showReplyForm = false)"
    />
    <UButton @click="showReplyForm = false" icon="i-mdi-close" label="Cancel" />
  </UModal>
</template>
