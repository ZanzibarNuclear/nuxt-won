<script setup lang="ts">
const wsy = useWsyStore()
const friendEmail = ref('')

const doInvite = async () => {
  const result = await $fetch('/api/invitations', {
    method: 'POST',
    body: {
      friendEmail: friendEmail.value,
      solicitorAlias: wsy.player?.alias,
      topicKey: wsy.activeThreadKey,
    },
  })

  const alertMsg = result.success
    ? 'We sent your friend an invitation. You might want to let them know that it was really you.'
    : 'Something happened and we were unable to send the invitation. Sorry about that.'
  const invited = alert(alertMsg)
}
</script>

<template>
  <div class="p-4">
    Invite someone to respond. (Best if it's someone you know.)
    <UFormGroup label="Email" description="Your friend's email address">
      <UInput v-model="friendEmail" />
    </UFormGroup>
    <UButton class="mt-2" @click="doInvite">Invite</UButton>
  </div>
</template>
