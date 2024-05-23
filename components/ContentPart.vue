<template>
  <UButton icon="i-ph-pencil" @click="setEdit" />
  <ContentPartImage
    v-if="part.type === 'image'"
    :fields="part.details"
    :edit="edit"
    @close="setReadOnly"
    @set-changes="handleChanges"
  />
</template>

<script setup lang="ts">
const props = defineProps(['part'])
const edit = ref(false)

const setReadOnly = () => {
  edit.value = false
}
const setEdit = () => {
  edit.value = true
}
const handleChanges = (details) => {
  console.log('commit changes', details)
  // TODO: commit updates to part -- need some kind of ID
  setReadOnly()
}
</script>

<style scoped>
.field {
  border: 1px purple dashed;
  padding: 0.5rem;
  margin: 0.5rem 0;
}
</style>
