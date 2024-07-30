<template>
  <div>Tiptap demo</div>
  <standard-editor
    :initial-content="description"
    @save-changes="handleSave"
    @cancel-edit="handleClose"
  />
</template>

<script setup lang="ts">
const description = ref('Hello, World.')

const handleSave = (stuff) => {
  console.log('Saving...', stuff)
  console.log(description.value)
}
const handleClose = () => {
  console.log('Closing...')
  console.log(description.value)
}
</script>

<style scoped></style>
