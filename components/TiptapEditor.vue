<template>
  <div>
    <div>
      <UModal v-model="isOpen" prevent-close>
        <TiptapEditorToolbar
          v-if="editor"
          :editor="editor"
          @save-changes="handleSave"
          @close-editor="handleClose"
        />
        <TiptapEditorContent :editor="editor" />
      </UModal>
    </div>
    <UButton @click="isOpen = true" label="Let's write!" />
  </div>
</template>

<script setup>
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import Underline from '@tiptap/extension-underline'

const emit = defineEmits(['saveChanges', 'closeEditor'])
const isOpen = ref(false)
const editor = useEditor({
  extensions: [TiptapStarterKit, Superscript, Subscript, Underline],
  autofocus: true,
  editorProps: {
    attributes: {
      class:
        'border-2 p-2 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
    },
  },
})

onMounted(() => {
  editor.value.commands.focus('start')
})

const handleSave = () => {
  console.log('Saving...')
  emit('saveChanges', editor.value)
  emit('closeEditor')
}
const handleClose = () => {
  emit('closeEditor')
  isOpen.value = false
}
onBeforeUnmount(() => {
  unref(editor).destroy()
})
</script>
