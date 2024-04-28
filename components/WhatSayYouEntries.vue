<script setup lang="ts">
const supabase = useSupabaseClient()
const wsy = useWsyStore()

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

const formatEntry = (entry) => {
  return entry.replaceAll('\n', '<br/><br/>')
}

const doPostEntry = async () => {
  if (!wsy.isActiveThread) {
    return
  }
  if (statement.value.trim() === '') {
    return
  }

  // TODO: fix responding to, which wasn't coded right in the first place

  const { data, error } = await supabase
    .from('wsy_entries')
    .insert({
      thread_id: wsy.activeThread.id,
      author_id: wsy.player.id,
      statement: statement.value.trim(),
    })
    .select()

  if (error) {
    console.error('Unable to post entry', error)
    return
  }
  wsy.addEntryToActive(data[0])
  statement.value = ''
  focusOnEntryInput()
}
</script>

<template>
  <div class="my-6">
    <div>
      Now make as many statements as you want. Simply stop when you have said it
      all. Sit back and wait for reactions.
    </div>
    <UFormGroup label="Make a statement. Speak your mind.">
      <UTextarea v-model="statement" ref="statementTextareaRef" name="entry" />
    </UFormGroup>
    <UButton class="mt-2" @click="doPostEntry">Post</UButton>
  </div>
  <ul v-if="wsy.isActiveEntries">
    <li v-for="item in wsy.activeEntries" class="my-3">
      <UCard>
        <template #header>
          <span class="text-xs">{{ item.posted_at }}</span>
        </template>
        <span v-html="formatEntry(item.statement)" />
      </UCard>
    </li>
  </ul>
</template>
