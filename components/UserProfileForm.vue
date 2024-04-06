<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Email" description="Your primary email address">
      <UInput
        type="email"
        placeholder="you@somewhere.com"
        v-model="state.email"
        size="sm"
        disabled
      />
    </UFormGroup>
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
    <UFormGroup label="Legal Name" description="For official correspondence">
      <UInput
        placeholder="John Smith, Billy Dee Williams"
        v-model="state.legalName"
        size="sm"
      />
    </UFormGroup>
    <UFormGroup label="About You">
      <UTextarea
        placeholder="Tell others a little about yourself"
        v-model="state.about"
        size="sm"
      />
    </UFormGroup>
    <UFormGroup label="X Username">
      <UInput placeholder="X Username" v-model="state.xUsername" size="sm">
        <template #leading>@</template>
      </UInput>
    </UFormGroup>
    <UFormGroup label="LinkedIn Username">
      <UInput
        placeholder="LinkedIn Username"
        v-model="state.linkedInUsername"
        size="sm"
      >
        <template #leading>@</template>
      </UInput>
    </UFormGroup>
    <UFormGroup label="Discord Username">
      <UInput placeholder="Discord" v-model="state.discordUsername" size="sm" />
    </UFormGroup>
    <UButton type="submit">Save Changes</UButton>
  </UForm>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const schema = object({
  email: string(),
  screenName: string(),
  legalName: string(),
  about: string(),
  xUsername: string(),
  linkedInUsername: string(),
  discordUsername: string(),
})

type Schema = InferType<typeof schema>

const state = reactive({
  screenName: undefined,
  legalName: undefined,
  about: undefined,
  xUsername: undefined,
  linkedInUsername: undefined,
  discordUsername: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
}
</script>

<style scoped></style>
