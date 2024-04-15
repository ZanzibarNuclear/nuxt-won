<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup
      label="Screen Name"
      description="The name you want to show others"
    >
      <UInput
        placeholder="Have fun with this one"
        v-model="state.screenName"
        size="sm"
      />
    </UFormGroup>
    <UFormGroup label="Full Name" description="For official correspondence">
      <UInput
        placeholder="John Smith, Billy Dee Williams"
        v-model="state.fullName"
        size="sm"
      />
    </UFormGroup>
    <UFormGroup label="Why did you join?">
      <UTextarea
        placeholder="What do you hope to get from World of Nuclear?"
        v-model="state.joinReason"
        size="sm"
      />
    </UFormGroup>
    <UFormGroup label="What do you like about nuclear?">
      <UTextarea
        placeholder="Tell the world your favorite thing."
        v-model="state.nuclearLikes"
        size="sm"
      />
    </UFormGroup>
    <UFormGroup label="X Username">
      <UInput placeholder="X Username" v-model="state.xUsername" size="sm">
        <template #leading>@</template>
      </UInput>
    </UFormGroup>
    <UFormGroup label="LinkedIn Profile Name">
      <UInput
        placeholder="LinkedIn Username"
        v-model="state.linkedInProfileName"
        size="sm"
      >
        <template #leading>@</template>
      </UInput>
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
  screenName: string(),
  fullName: string(),
  joinReason: string(),
  nuclearLikes: string(),
  xUsername: string(),
  linkedInProfileName: string(),
})

type Schema = InferType<typeof schema>

const state = reactive({
  screenName: profile.screenName,
  fullName: profile.fullName,
  joinReason: profile.joinReason,
  nuclearLikes: profile.nuclearLikes,
  xUsername: profile.xUsername,
  linkedInProfileName: profile.linkedInProfileName,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('saveChanges', event.data)
}
</script>

<style scoped></style>
