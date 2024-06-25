<template>
  <div class="p-4">
    Invite someone to respond. (Best if it's someone you know.)
    <UFormGroup label="Email" description="Your friend's email address">
      <UInput v-model="friendEmail" />
    </UFormGroup>
    <UFormGroup label="Name" description="Your friend's name">
      <UInput v-model="friendName" />
    </UFormGroup>
    <UButton class="mt-2" @click="doInvite">Invite</UButton>
  </div>
</template>

<script setup lang="ts">
const wsy = useWsyStore()
const friendEmail = ref('')
const friendName = ref('')

const doInvite = async () => {
  const body = {
    friendEmail: friendEmail.value,
    friendName: friendName.value,
    solicitorId: wsy.player?.user_id,
    solicitorAlias: wsy.player?.alias,
    topicKey: wsy.activeThreadKey,
  }
  console.log('Invitation to WSY', body)
  const result = await $fetch('/api/invitations', {
    method: 'POST',
    body,
  })

  const alertMsg = result.success
    ? 'We sent your friend an invitation. You might want to let them know that it was really you.'
    : 'Sorry, we did not send the invitation. The email address you provided may be on our "no contact" list.'
  const invited = alert(alertMsg)
}
</script>
