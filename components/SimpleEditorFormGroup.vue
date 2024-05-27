<template>
  <UFormGroup :label="fieldNameLabel" :name="fieldName">
    <simple-editor
      v-if="isEdit"
      :initial-content="fields[fieldName]"
      @share-changes="handleSave"
      @close="handleClose"
    />
    <div v-else class="rich-text">
      <span v-html="fields[fieldName]" />
      <UIcon name="i-mdi-edit" @click="handleOpen" />
    </div>
  </UFormGroup>
</template>

<script setup lang="ts">
const isEdit = ref(false)
const props = defineProps({
  fields: { type: Object, required: true },
  fieldName: { type: String, required: true },
})
const handleSave = (latest: string) => {
  props.fields[props.fieldName] = latest
  isEdit.value = false
}
const handleOpen = () => {
  isEdit.value = true
}
const handleClose = () => {
  isEdit.value = false
}
const fieldNameLabel = computed(() => {
  return props.fieldName[0].toUpperCase() + props.fieldName.slice(1)
})
</script>

<style scoped>
.rich-text ::v-deep p {
  margin: 0.75rem 0;
}
.rich-text ::v-deep ul {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: disc;
  list-style-position: inside;
}
</style>
