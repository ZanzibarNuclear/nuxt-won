<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup
      label="Screen Name"
      description="The name you want to show others"
    >
      <UInput
        placeholder="Have fun with this one"
        v-model="state.screen_name"
        size="sm"
      />
    </UFormGroup>
    <UFormGroup label="Full Name" description="For official correspondence">
      <UInput
        placeholder="John Smith, Billy Dee Williams"
        v-model="state.full_name"
        size="sm"
      />
    </UFormGroup>
    <UFormGroup label="Why did you join?">
      <UTextarea
        placeholder="What do you hope to get from World of Nuclear?"
        v-model="state.join_reason"
        size="sm"
      />
    </UFormGroup>
    <UFormGroup label="What do you like about nuclear?">
      <UTextarea
        placeholder="Tell the world your favorite thing."
        v-model="state.nuclear_likes"
        size="sm"
      />
    </UFormGroup>
    <UFormGroup>
      <template #label><UIcon name="i-ph-x-logo" /> Username</template>
      <UInput placeholder="X Username" v-model="state.x_username" size="sm">
        <template #leading>@</template>
      </UInput>
    </UFormGroup>
    <UFormGroup
      label="LinkedIn"
      description="The part that comes after https://www.linkedin.com/in/"
    >
      <template #label><UIcon name="i-ph-linkedin-logo" /> LinkedIn</template>
      <UInput
        placeholder="LinkedIn Profile Name"
        v-model="state.linkedin_profile_name"
        size="sm"
      />
    </UFormGroup>
    <UButton type="submit">Save Profile</UButton>
  </UForm>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { useUserStore } from '~/stores/userStore'

const profile = useUserStore().profile
const emit = defineEmits(['saveChanges'])

const schema = object({
  screen_name: string(),
  full_name: string(),
  join_reason: string(),
  nuclear_likes: string(),
  x_username: string(),
  linkedin_profile_name: string(),
})

type Schema = InferType<typeof schema>

const state = reactive({
  screen_name: profile.screen_name,
  full_name: profile.full_name,
  join_reason: profile.join_reason,
  nuclear_likes: profile.nuclear_likes,
  x_username: profile.x_username,
  linkedin_profile_name: profile.linkedin_profile_name,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('saveChanges', event.data)
}
</script>
