<template>
  <div class="my-6">
    <div>
      Make a statement. Speak your mind. Click Post to share with the world.
    </div>
    <client-only>
      <QuillEditor
        ref="statementEditor"
        content="<p></p>"
        content-type="html"
      />
    </client-only>
    <div class="mt-2">
      <UButton
        class="mr-2"
        icon="i-mdi-arrow-right"
        @click="() => onPostEntry(statementEditor)"
        title="(ctrl+enter)"
        >Post</UButton
      >
      <UButton @click="() => emit('close')" icon="i-mdi-close" label="Cancel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { QuillEditor } from '@vueup/vue-quill'
const wsy = useWsyStore()
const userContext = useUserStore()

const props = defineProps({
  respondingTo: { type: String },
})
const emit = defineEmits(['close'])

const statementEditor = ref()

const onPostEntry = async (editor) => {
  if (!wsy.isActiveThread || !userContext.wsyWriter) {
    console.warn(
      'Strange to make it this far without being signed in. Or maybe the thread became inactive.'
    )
    return
  }
  const minted = await $fetch('/api/say/entries', {
    method: 'POST',
    body: {
      threadKey: wsy.activeThreadKey,
      writerId: userContext.wsyWriter?.id,
      inResponseTo: props.respondingTo,
      statement: editor.getHTML(),
    },
  })
  wsy.addEntryToActive(minted)
  statementEditor.value.setHTML('<p></p>')
  emit('close')
}
</script>
