<template>
  <UFormGroup :label="fieldNameLabel" :name="fieldName">
    <simple-editor
      v-if="isEdit"
      :id="fieldName"
      :initial-content="fields[fieldName]"
      @share-changes="handleSave"
      @close="handleClose"
    />
    <div v-else class="flex items-center rich-text">
      <div>
        <UIcon
          class="mr-4 hover:bg-green-500"
          name="i-mdi-edit"
          @click="handleOpen"
        />
      </div>
      <div><span v-html="fields[fieldName]" /></div>
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
.rich-text :deep(p) {
  margin: 0.75rem 0;
}
.rich-text :deep(ul) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: disc;
  list-style-position: inside;
}
</style>
