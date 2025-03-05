<template>
  <ClientOnly>
    <div class="bg-nuclear-50 dark:bg-heroic-graphite dark:text-heroic-lightgray rounded-lg">
      <UForm :state="state" :schema="schema" @submit.prevent="onSubmit">
        <div>
          <UFormGroup name="email" :ui="formGroupStyle" label="Email address" required
            help="Check your spelling before you send.">
            <UInput v-model="state.email" placeholder="email address" icon="i-ph-envelope" />
          </UFormGroup>
          <NuxtTurnstile v-model="state.token" class="my-4" />
          <UButton type="submit" label="Send Magic Link" :ui="buttonStyle" icon="i-ph-arrow-circle-right-duotone"
            class="bg-nuclear-700 dark:bg-nuclear-400 text-white hover:bg-nuclear-500 dark:hover:bg-nuclear-300" />
        </div>
      </UForm>
    </div>
    <UModal v-model="notification.show" :title="notification.heading">
      <UCard>
        <template #header><span class="text-lg font-bold">{{
          notification.heading
        }}</span></template>
        <div>{{ notification?.message }}</div>
        <template #footer>
          <UButton @click="() => (notification.show = false)">Close</UButton>
        </template>
      </UCard>
    </UModal>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const schema = object({
  email: string().email().required('Required'),
  token: string().required('Required'),
})
type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  token: undefined,
})

const notification = reactive({
  show: false,
  heading: '',
  message: '',
})

const notify = (heading: string, message: string) => {
  notification.heading = heading
  notification.message = message
  notification.show = true
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log('You say your email address is ' + event.data.email + '. We shall see...')
  const response: any = await useWonAuth().loginWithMagicLink(event.data.email, "Nuclear Fan", event.data.token)
  notify(response.status === "success" ? "Magic Link Sent" : "Error Sending Magic Link", response.message)
}

const formGroupStyle = {
  wrapper: '',
  inner: '',
  label: {
    wrapper: 'flex content-center items-center justify-between',
    base: 'block font-medium text-gray-700 dark:text-gray-200 my-1',
    required: "after:content-['*'] after:ms-0.5 after:text-orange-500 dark:after:text-orange-400",
  },
  size: {
    '2xs': 'text-xs',
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-sm',
    xl: 'text-base',
  },
  container: 'mt-1 relative',
  description: 'text-xs text-nuclear-800 dark:text-nuclear-400',
  hint: 'text-xs text-gray-500 dark:text-gray-400',
  help: 'mt-2 pl-2 text-xs text-gray-500 dark:text-gray-400',
  error: 'text-xs mt-2 text-orange-500 dark:text-orange-400',
  default: {
    size: 'sm',
  },
}
const buttonStyle = {
  rounded: 'rounded-full',
}
</script>

<style></style>
