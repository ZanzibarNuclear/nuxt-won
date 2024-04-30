<script setup lang="ts">
const wsy = useWsyStore()

const showReplyForm = ref(false)
const inResponseTo = ref()

const formatEntry = (entry) => {
  return entry.replaceAll('\n', '<br/><br/>')
}

const onReply = (entryId) => {
  inResponseTo.value = entryId
  showReplyForm.value = true
}
</script>

<template>
  <WhatSayYouEntryForm />
  <ul v-if="wsy.isActiveEntries">
    <li v-for="item in wsy.activeEntries" class="my-3">
      <UCard>
        <div class="flex">
          <div class="flex-none mr-6 text-xs">
            by writer {{ item.author_id }}<br />
            {{ displayAsDateTime(item.posted_at) }}<br />
            <UButton
              @click="() => onReply(item.id)"
              icon="i-mdi-reply"
              size="xs"
              >reply</UButton
            >
          </div>
          <div class="grow">
            <span v-html="formatEntry(item.statement)" />
          </div>
        </div>
      </UCard>
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
