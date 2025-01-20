<template>
  <StandardEditorToolbar
    v-if="editor"
    :editor="editor"
    @save-changes="handleSave"
    @close-editor="handleClose"
  />
  <div class="editor-frame">
    <TiptapEditorContent :editor="editor" />
  </div>
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
        'border-2 bg-white text-slate-700 max-w-none prose prose-stone prose-sm m-0 prose-p:p-1 prose-li:m-0 prose-li:p-0 focus:outline-none',
    },
  },
  extensions: [TiptapStarterKit, TiptapSuperscript, TiptapSubscript, TiptapUnderline, TiptapLink],
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
  const fixLi = snapshot?.replaceAll(/<li><p>(.*?)<\/p><(\/?)(ol|li|ul)>/gi, '<li>$1<$2$3>')
  console.log('saving...', fixLi)
  emit('saveChanges', fixLi)
}
const handleClose = () => {
  console.log('closing...')
  emit('cancelEdit')
}
</script>

<style lang="scss">
.editor-frame {
  overflow-y: scroll; /* Adds a vertical scrollbar */
  max-height: 60vh; /* Sets a maximum height for the element */
  @apply text-heroic-graphite dark:text-heroic-lightgray bg-heroic-lightgray dark:bg-heroic-graphite;
}
.tiptap {
  p {
    margin: 1em 0;
    font-size: medium;
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.5rem;
    @apply text-primary;
  }
  h3 {
    font-size: 1.2rem;
  }
  h4 {
    font-size: 1rem;
    font-weight: bold;
  }
}
</style>
