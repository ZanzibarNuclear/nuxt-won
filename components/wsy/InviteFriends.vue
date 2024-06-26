<template>
  <div class="p-4">
    Invite someone to respond. (Best if it's someone you know.)
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" description="Your friend's email address">
        <UInput v-model="state.email" />
      </UFormGroup>
      <UFormGroup label="Name" description="Your friend's name">
        <UInput v-model="state.name" />
      </UFormGroup>
      <UButton class="mt-2" icon="i-ph-envelope" type="submit" label="Invite" />
      <UButton
        class="mt-2 ml-2"
        icon="i-ph-x-circle-fill"
        label="Cancel"
        @click="emit('cancel')"
      />
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const emit = defineEmits(['cancel'])
const wsy = useWsyStore()
const userContext = useUserStore()

const schema = object({
  email: string()
    .email('Please use a valid email address')
    .required('We need this to mail the invitation.'),
  name: string().required("What is your friend's name?"),
})
type Schema = InferType<typeof schema>
const state = reactive({
  email: '',
  name: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log('sending email', event.data)

  const body = {
    friendEmail: event.data.email,
    friendName: event.data.name,
    solicitorId: userContext.player?.user_id,
    solicitorAlias: userContext.player?.alias,
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
  alert(alertMsg)
}
</script>
