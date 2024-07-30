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
    TiptapLink,
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
  const fixLi = snapshot?.replaceAll(
    /<li><p>(.*?)<\/p><(\/?)(ol|li|ul)>/gi,
    '<li>$1<$2$3>'
  )
  console.log('saving...', fixLi)
  emit('saveChanges', fixLi)
}
const handleClose = () => {
  console.log('closing...')
  emit('cancelEdit')
}
</script>

<style lang="scss">
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }
}
</style>
