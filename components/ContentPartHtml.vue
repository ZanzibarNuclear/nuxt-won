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
    <div><span v-html="details.html" /></div>
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

const commit = (snapshot: string) => {
  details.value.html = snapshot
  emit('save', details.value)
}
const cancel = () => {
  emit('cancel')
}
</script>

<style scoped></style>
