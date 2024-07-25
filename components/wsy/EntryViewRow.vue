<template>
  <div class="post-vspace" :style="indentStyle">
    <div v-if="indent" class="marker">
      <UIcon name="i-mdi-arrow-right-bottom" />
    </div>
    <div class="post">
      <div class="text-xs">
        <span class="font-bold">{{
          wsy.lookupWriter(entry.writerId)?.penName || 'Unknown'
        }}</span
        ><br />
        {{ displayAsDateTime(entry.posted_at) }}<br />
        <UButton @click="emit('reply')" icon="i-mdi-reply" size="xs"
          >Reply</UButton
        >
        <UButton
          v-if="entry.writerId === userContext.wsyWriter?.id"
          @click="emit('edit')"
          icon="i-ph-pencil"
          size="xs"
          >Edit</UButton
        >
      </div>
      <div class="rich-text">
        <span v-html="formatEntry(entry.statement)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const wsy = useWsyStore()
const userContext = useUserStore()

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
const emit = defineEmits(['reply', 'edit'])

const indentStyle = computed(() => {
  if (props.indent) {
    const indentSize = props.indent * 50
    return {
      display: 'grid',
      'grid-template-columns': indentSize + 'px auto',
    }
  } else {
    return {}
  }
})

const formatEntry = (entry: string) => {
  return entry.replaceAll('\n', '<br/><br/>')
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
.rich-text :deep(p) {
  margin-bottom: 0.5rem;
}
.rich-text :deep(ul) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: disc;
  list-style-position: inside;
}
.rich-text :deep(ol) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: decimal;
  list-style-position: inside;
}
.rich-text :deep(blockquote) {
  margin-left: 1rem;
  border-left: 2px solid goldenrod;
  padding-left: 1rem;
}
</style>
