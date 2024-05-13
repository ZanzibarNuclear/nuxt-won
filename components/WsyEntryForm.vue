<template>
  <div class="my-6">
    <div>
      Make a statement. Speak your mind. Click Post to share with the world.
    </div>
    <QuillEditor ref="statementEditor" content="<p></p>" content-type="html" />
    <div class="mt-2">
      <UButton
        class="mr-2"
        icon="i-mdi-arrow-right"
        @click="() => doPostEntry(statementEditor)"
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
const supabase = useSupabaseClient()
const wsy = useWsyStore()

const props = defineProps({
  respondingTo: { type: Number },
})
const emit = defineEmits(['close'])

const statementEditor = ref()

defineShortcuts({
  meta_e: () => {
    focusOnEntryInput()
  },
  meta_enter: {
    usingInput: 'statementEditor',
    handler: () => {
      console.log('pressed hot key to post entry')
      doPostEntry(statementEditor.value)
    },
  },
})
const focusOnEntryInput = () => {
  statementEditor.value.focus()
}

onMounted(() => {
  focusOnEntryInput()
})

const doPostEntry = async (editor) => {
  if (!wsy.isActiveThread || !wsy.isPlayerLoaded) {
    // somehow made it this far without being logged in or without a registered player
    return
  }
  const statement = editor.getHTML()
  const { data, error } = await supabase
    .from('wsy_entries')
    .insert({
      thread_id: wsy.activeThread.id,
      author_id: wsy.player.id,
      statement: statement,
      responding_to: props.respondingTo,
    })
    .select()

  if (error) {
    console.error('Unable to post entry', error)
    return
  }
  wsy.addEntryToActive(data[0])
  statementEditor.value.setHTML('<p></p>')
  focusOnEntryInput()
  emit('close')
}
</script>
