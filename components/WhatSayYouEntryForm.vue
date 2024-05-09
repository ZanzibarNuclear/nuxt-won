<script setup lang="ts">
const supabase = useSupabaseClient()
const wsy = useWsyStore()

const props = defineProps({
  respondingTo: { type: Number },
})
const emit = defineEmits(['close'])

const statement = ref('')
const statementTextareaRef = ref()
defineShortcuts({
  meta_e: () => {
    focusOnEntryInput()
  },
  meta_enter: {
    usingInput: 'entry',
    handler: () => {
      doPostEntry()
    },
  },
})
const focusOnEntryInput = () => {
  statementTextareaRef.value.$refs.textarea.focus()
}

onMounted(() => {
  focusOnEntryInput()
})

const doPostEntry = async () => {
  if (!wsy.isActiveThread) {
    return
  }
  if (statement.value.trim() === '') {
    return
  }

  const { data, error } = await supabase
    .from('wsy_entries')
    .insert({
      thread_id: wsy.activeThread.id,
      author_id: wsy.player.id,
      statement: statement.value.trim(),
      responding_to: props.respondingTo,
    })
    .select()

  if (error) {
    console.error('Unable to post entry', error)
    return
  }
  wsy.addEntryToActive(data[0])
  statement.value = ''
  focusOnEntryInput()
  emit('close')
}
</script>

<template>
  <div class="my-6">
    <UFormGroup
      label="Make a statement. Speak your mind. Click Post to share with the world."
    >
      <UTextarea v-model="statement" ref="statementTextareaRef" name="entry" />
    </UFormGroup>
    <UButton class="mt-2" @click="doPostEntry" title="(ctrl+enter)"
      >Post</UButton
    >
  </div>
</template>
