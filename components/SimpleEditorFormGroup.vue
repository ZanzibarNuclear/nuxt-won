<template>
  <UFormGroup label="Description" name="description">
    <simple-editor
      v-if="isEdit"
      :initial-content="fields[fieldName]"
      @share-changes="handleSave"
      @close="handleClose"
    />
    <div v-else>
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
</script>

<style scoped></style>
