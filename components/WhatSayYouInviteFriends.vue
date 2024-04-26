<template>
  <div>
    Invite your friends to respond.
    <UFormGroup label="Email" description="Your friend's email address">
      <UInput v-model="friendEmail" />
    </UFormGroup>
    <UButton class="mt-2" @click="doInvite">Invite</UButton>
  </div>
</template>

<script setup lang="ts">
const wsy = useWsyStore()
const friendEmail = ref('')
const doInvite = () => {
  alert(
    `We will send an invitation to ${friendEmail} and bring them to [${wsy.activeThreadKey}].`
  )
}
</script>
