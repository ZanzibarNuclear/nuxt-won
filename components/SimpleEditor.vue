<template>
  <client-only>
    <div class="editor-container">
      <QuillEditor
        ref="editorRef"
        :options="quillOptions"
        toolbar="minimal"
        content-type="html"
        v-model:content="editorContent"
      />
      <UButton
        label="Save"
        @click="emit('shareChanges', editorRef.getHTML())"
      />
      <UButton label="Cancel without save" @click="emit('close')" />
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps(['initialContent'])
const emit = defineEmits(['shareChanges', 'close'])

const editorRef = ref()
const editorContent = ref('')
const quillOptions = {
  theme: 'snow',
  placeholder: 'Your insights go here...',
}

onMounted(() => {
  if (props.initialContent) {
    console.log('setting content', props.initialContent)
    editorContent.value = props.initialContent
  }
})
</script>
