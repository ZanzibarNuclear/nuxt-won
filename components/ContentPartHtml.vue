<template>
  <div v-if="edit">
    <div>
      <SimpleEditor
        :initial-content="details.html"
        @share-changes="commit"
        @close="cancel"
      />
    </div>
  </div>
  <div v-if="!edit && !preview">
    <div>HTML: {{ details.html }}</div>
  </div>
  <div v-if="preview">
    <div class="rich-text"><span v-html="details.html" /></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['fields', 'edit', 'preview'])
const emit = defineEmits(['save', 'cancel'])

const details = ref({
  html: '',
})

onMounted(() => {
  details.value = {
    html: props.fields.html,
  }
})
onUpdated(() => {
  details.value.html = props.fields.html
})

const commit = (snapshot: string) => {
  details.value.html = snapshot
  emit('save', details.value)
}
const cancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.rich-text :deep(p) {
  margin: 0.75rem 0;
}
.rich-text :deep(ul) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: disc;
  list-style-position: inside;
}
.rich-text :deep(blockquote) {
  margin-left: 1rem;
  border-left: 2px solid goldenrod;
  padding-left: 1rem;
}
</style>
