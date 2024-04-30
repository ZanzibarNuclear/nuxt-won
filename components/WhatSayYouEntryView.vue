<script setup lang="ts">
const supabase = useSupabaseClient()
const wsy = useWsyStore()

const statement = ref('')
const statementTextareaRef = ref()
const inResponseTo = ref()

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
      responding_to: inResponseTo.value,
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

const onReply = (entryId) => {
  console.log(`Reply to entry with ID=${entryId}`)
  alert('Coming soon...you will be able to respond.')
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
  <ul v-if="wsy.isActiveEntries">
    <li v-for="item in wsy.activeEntries" class="my-3">
      <UCard>
        <div class="flex">
          <div class="flex-none mr-6 text-xs">
            by writer {{ item.author_id }}<br />
            {{ displayAsDateTime(item.posted_at) }}<br />
            <UButton
              @click="() => onReply(item.id)"
              icon="i-mdi-reply"
              size="xs"
              >reply</UButton
            >
          </div>
          <div class="grow">
            <span v-html="formatEntry(item.statement)" />
          </div>
        </div>
      </UCard>
    </li>
  </ul>
</template>
