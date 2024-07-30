<template>
  <div v-for="entry in entries" class="my-3">
    <wsy-entry-view-row
      :entry="entry"
      :indent="indent"
      @reply="() => onOpenReplyForm(entry.publicKey)"
      @edit="() => onOpenForEdit(entry)"
    />
    <wsy-entry-form
      v-if="showReplyForm(entry.publicKey)"
      :responding-to="entry.publicKey"
      @close="onCloseReplyForm"
    />
    <standard-editor
      v-if="entryToEdit"
      :initial-content="entryToEdit.statement"
      @save-changes="onSaveEntry"
      @cancel-edit="onCloseEditForm"
    />
    <div v-if="wsy.hasResponses(entry.publicKey)">
      <wsy-entry-view-recursive
        :entries="wsy.responseEntries(entry.publicKey)"
        :indent="indent + 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const wsy = useWsyStore()

defineProps(['entries', 'indent'])

const activeReply = ref()
const entryToEdit = ref()

const showReplyForm = (publicKey: string) => publicKey === activeReply.value
const onOpenReplyForm = (publicKey: string) => (activeReply.value = publicKey)
const onCloseReplyForm = () => (activeReply.value = null)

const onOpenForEdit = (entry) => {
  entryToEdit.value = entry
}
const onCloseEditForm = () => (entryToEdit.value = null)
const onSaveEntry = async (changes) => {
  const delta = await $fetch(
    `/api/say/entries/${entryToEdit.value.publicKey}`,
    {
      method: 'PUT',
      body: {
        statement: changes,
      },
    }
  )
  wsy.updateEntry(delta)
  onCloseEditForm()
}
</script>

<style scoped></style>
