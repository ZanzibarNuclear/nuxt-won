<template>
  <UCard>
    <template #header>
      <div class="text-2xl">Sign in with Magic Link</div>
    </template>
    <UForm :state="state" :schema="schema" @submit="onSendMagicLink">
      <UInput v-model="state.email" type="email" />
      <UButton type="submit" label="Send link" />
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
  email: string().email('Invalid email').required('Required'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
})

async function onSendMagicLink(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
  const { email } = event.data
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email,
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
