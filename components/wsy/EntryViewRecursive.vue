<template>
  <div v-for="entry in entries" class="my-3">
    <wsy-entry-view-row
      :entry="entry"
      :indent="indent"
      @reply="() => openReplyForm(entry.publicKey)"
    />
    <wsy-entry-form
      v-if="showReplyForm(entry.publicKey)"
      :responding-to="entry.publicKey"
      @close="closeReplyForm"
    />
    <div v-if="wsy.hasResponses(entry.publicKey)">
      <wsy-entry-view-recursive
        :entries="wsy.responseEntries(entry.publicKey)"
        :indent="indent + 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const wsy = useWsyStore()

defineProps(['entries', 'indent'])

const activeReply = ref()
const showReplyForm = (publicKey: string) => publicKey === activeReply.value
const openReplyForm = (publicKey: string) => (activeReply.value = publicKey)
const closeReplyForm = () => (activeReply.value = null)
</script>

<style scoped></style>
