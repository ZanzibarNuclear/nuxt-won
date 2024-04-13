<template>
  <UCard>
    <template #header>
      <h2>Sign in with Magic Link</h2>
      <div>
        We will create a World of Nuclear account for you if you need one.
      </div>
    </template>
    <UForm :state="state" :schema="schema" @submit="onSendMagicLink">
      <UFormGroup label="Email" name="email">
        <UButtonGroup size="md" orientation="horizontal">
          <UInput
            class="mr-4"
            name="email"
            v-model="state.email"
            placeholder="your email address"
          />
          <UButton type="submit" label="Send link" />
        </UButtonGroup>
      </UFormGroup>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const emit = defineEmits(['finish'])
const supabase = useSupabaseClient()
const loading = ref(false)

const schema = object({
  email: string()
    .email('Invalid email')
    .required('We need to know where to send the link'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
})

async function onSendMagicLink(event: FormSubmitEvent<Schema>) {
  const config = useRuntimeConfig()
  const { email } = event.data
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${config.baseUrl}/auth/confirm`,
      },
    })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
    emit('finish')
  }
}
</script>

<style lang="scss" scoped></style>
