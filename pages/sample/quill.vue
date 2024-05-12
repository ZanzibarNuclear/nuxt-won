<template>
  <h1>Quill Editor sample</h1>
  <div>
    <h2>No theme</h2>
    <ClientOnly>
      <QuillEditor ref="plainEditor" :content="doc" content-type="html" />
    </ClientOnly>
    <UButton label="Save" @click="() => handleSave(plainEditor)" />
  </div>
  <div>
    <h2>Snow theme</h2>
    <ClientOnly>
      <QuillEditor ref="snowEditor" theme="snow" />
    </ClientOnly>
    <UButton label="Save" @click="() => handleSave(snowEditor)" />
  </div>
  <div>
    <h2>Bubble theme</h2>
    <div>select to see toolbar in bubble</div>
    <ClientOnly>
      <div class="bubble-editor">
        <QuillEditor ref="bubbleEditor" theme="bubble" />
      </div>
    </ClientOnly>
    <UButton label="Save" @click="() => handleSave(bubbleEditor)" />
  </div>
</template>

<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { QuillEditor } from '@vueup/vue-quill'

const plainEditor = ref('plainEditor')
const snowEditor = ref('snowEditor')
const bubbleEditor = ref('bubbleEditor')

const doc = ref('<p>Hello, world.</p>')

const handleSave = (editor) => {
  console.log(editor.getHTML())
}
</script>

<style scoped>
.bubble-editor {
  border: 1px lightgray solid;
}
</style>
