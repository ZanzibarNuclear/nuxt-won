<template>
  <div class="row-indent-1 post-vspace">
    <div class="marker"><UIcon name="i-mdi-arrow-right-bottom" /></div>
    <div class="post">
      <div>
        by writer {{ entry.author_id }}<br />
        {{ displayAsDateTime(entry.posted_at) }}<br />
        <UButton @click="() => onReply(entry.id)" icon="i-mdi-reply" size="xs"
          >reply</UButton
        >
      </div>
      <div><span v-html="formatEntry(entry.statement)" /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  entry: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['reply'])
const formatEntry = (entry: string) => {
  return entry.replaceAll('\n', '<br/><br/>')
}
const onReply = (id: number) => {
  emit('reply', id)
}
</script>

<style scoped>
.marker {
  text-align: right;
  padding-right: 10px;
}
.post {
  display: grid;
  grid-template-columns: 200px auto;
}
.post-vspace {
  margin-bottom: 1.25rem;
}
.row-indent-1 {
  display: grid;
  grid-template-columns: 100px auto;
}
</style>
