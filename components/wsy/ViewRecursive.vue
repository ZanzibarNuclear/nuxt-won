<template>
  <div v-for="entry in entries" class="my-3">
    <wsy-post-view-row
      :entry="entry"
      :indent="indent"
      @reply="() => openReplyForm(entry.id)"
    />
    <wsy-entry-form
      v-if="showReplyForm(entry.id)"
      :responding-to="entry.id"
      @close="closeReplyForm"
    />
    <div v-if="wsy.hasResponses(entry.id)">
      <wsy-view-recursive
        :entries="wsy.responseEntries(entry.id)"
        :indent="indent + 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const wsy = useWsyStore()

defineProps(['entries', 'indent'])

const activeReply = ref(0)
const showReplyForm = (id: number) => id === activeReply.value
const openReplyForm = (id: number) => (activeReply.value = id)
const closeReplyForm = () => (activeReply.value = 0)
</script>

<style scoped></style>
