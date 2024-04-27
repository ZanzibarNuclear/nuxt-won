<script setup lang="ts">
const wsy = useWsyStore()
const statement = ref('')

const doPostEntry = async () => {
  if (!wsy.isActiveThread) {
    return
  }
  if (statement.value.trim() === '') {
    return
  }

  // TODO: fix responding to, which wasn't coded right in the first place

  const newEntry = await $fetch('/api/entries', {
    method: 'post',
    body: {
      threadId: wsy.activeThread.id,
      participantId: wsy.player.id,
      statement: statement.value.trim(),
    },
  })
  wsy.addEntryToActive(newEntry)
  statement.value = ''
}
</script>

<template>
  <div class="my-6">
    <div>
      Now make as many statements as you want. Simply stop when you have said it
      all. Sit back and wait for reactions.
    </div>
    <UFormGroup label="Make a statement. Speak your mind.">
      <UTextarea v-model="statement" />
    </UFormGroup>
    <UButton class="mt-2" @click="doPostEntry">Post</UButton>
  </div>
  <ul v-if="wsy.isActiveEntries">
    <li v-for="item in wsy.activeEntries" class="my-3">
      <UCard>
        <template #header>
          <span class="text-xs">{{ item.posted_at }}</span>
        </template>
        {{ item.statement }}
      </UCard>
    </li>
  </ul>
</template>
