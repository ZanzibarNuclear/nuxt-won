<template>
  <client-only>
    <div class="editor-container">
      <QuillEditor
        ref="editorRef"
        :options="quillOptions"
        :toolbar="notTooSimpleToolbar"
        content-type="html"
        v-model:content="editorContent"
      />
      <div class="my-2">
        <UButton
          icon="i-mdi-arrow-right"
          label="Save"
          @click="emit('shareChanges', editorRef.getHTML())"
        />
        <UButton
          icon="i-mdi-cancel"
          label="Cancel edit"
          @click="emit('close')"
        />
      </div>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps(['initialContent'])
const emit = defineEmits(['shareChanges', 'close'])

const notTooSimpleToolbar = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', { script: 'super' }, { script: 'sub' }],
  ['link'],
  [
    { indent: '+1' },
    { indent: '-1' },
    'blockquote',
    { list: 'ordered' },
    { list: 'bullet' },
  ],
  ['clean'],
]

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
