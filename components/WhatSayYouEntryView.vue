<script setup lang="ts">
const props = defineProps({
  entry: {
    type: Object,
    required: true,
  },
  indent: {
    type: Number,
    default: 0,
  },
})
const emit = defineEmits(['reply'])

const formatEntry = (entry: string) => {
  return entry.replaceAll('\n', '<br/><br/>')
}

const spacerClass = ref('post-spacer')
const indentedStyle = computed(() => {
  const indentColumnWidth = props.indent * 40
  return {
    grid: 'display',
    'grid-template-columns': `${indentColumnWidth}px auto`,
  }
})

const onReply = (id: number) => {
  emit('reply', id)
}
</script>

<template>
  <div :class="[indentedStyle, spacerClass]">
    <div class="marker">-></div>
    <UCard class="post">
      <div>
        by writer {{ entry.author_id }}<br />
        {{ displayAsDateTime(entry.posted_at) }}<br />
        <UButton @click="() => onReply(entry.id)" icon="i-mdi-reply" size="xs"
          >reply</UButton
        >
      </div>
      <div>
        <span v-html="formatEntry(entry.statement)" />
      </div>
    </UCard>
  </div>
</template>

<style lang="scss" scoped>
.post {
  display: grid;
  grid-template-columns: 200px auto;
}
.post-spacer {
  margin-bottom: 1.25rem;
}
.marker {
  text-align: right;
  padding-right: 5px;
}
</style>
