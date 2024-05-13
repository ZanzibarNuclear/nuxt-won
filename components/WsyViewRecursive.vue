<template>
  <div v-for="entry in entries" class="my-3">
    <WsyPostViewRow
      :entry="entry"
      :indent="indent"
      @reply="showReplyForm = true"
    />
    <WsyEntryForm
      v-if="showReplyForm"
      :responding-to="entry.id"
      @close="showReplyForm = false"
    />
    <div v-if="wsy.hasResponses(entry.id)">
      <WsyViewRecursive
        :entries="wsy.responseEntries(entry.id)"
        :indent="indent + 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const wsy = useWsyStore()

defineProps(['entries', 'indent'])

const showReplyForm = ref(false)
</script>

<style scoped></style>
