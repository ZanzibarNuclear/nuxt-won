<template>
  <div v-for="entry in entries" class="my-3">
    <WsyPostViewRow
      :entry="entry"
      :indent="indent"
      @reply="() => emit('reply')"
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
const emit = defineEmits(['reply'])
</script>

<style scoped></style>
