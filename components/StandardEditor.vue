<template>
  <StandardEditorToolbar
    v-if="editor"
    :editor="editor"
    @save-changes="handleSave"
    @close-editor="handleClose"
  />
  <TiptapEditorContent :editor="editor" />
</template>

<script setup lang="ts">
const props = defineProps(['initialContent'])
const emit = defineEmits(['saveChanges', 'cancelEdit'])

const editor = useEditor({
  autofocus: true,
  content: props.initialContent,
  editorProps: {
    attributes: {
      class:
        'border-2 p-2 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
    },
  },
  extensions: [
    TiptapStarterKit,
    TiptapSuperscript,
    TiptapSubscript,
    TiptapUnderline,
  ],
})

onMounted(() => {
  if (editor.value) {
    editor.value.commands.focus('start')
  }
})
onBeforeUnmount(() => {
  unref(editor).destroy()
})

const handleSave = () => {
  const snapshot = editor.value?.getHTML()
  console.log('saving...', snapshot)
  emit('saveChanges', snapshot)
}
const handleClose = () => {
  console.log('closing...')
  emit('cancelEdit')
}
</script>
