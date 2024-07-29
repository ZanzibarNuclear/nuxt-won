<template>
  <div class="my-6">
    <div>
      Make a statement. Speak your mind. Click Post to share with the world.
    </div>
    <standard-editor @save-changes="onPostEntry" @cancel-edit="emit('close')" />
  </div>
</template>

<script setup lang="ts">
const wsy = useWsyStore()
const userContext = useUserStore()

const props = defineProps({
  respondingTo: { type: String },
})
const emit = defineEmits(['close'])

const onPostEntry = async (statement) => {
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
      statement: statement,
    },
  })
  wsy.addEntryToActive(minted)
  emit('close')
}
</script>
