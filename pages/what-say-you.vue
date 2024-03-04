<template>
  <div class="text-2xl font-bold">What Say You</div>
  <UForm
    :schema="schema"
    :state="state"
    class="mt-6 space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Your pithy wisdom, or whatever" name="statement">
      <UTextarea
        v-model="state.statement"
        placeholder="Go ahead and type something. Anything."
        autoresize
      />
    </UFormGroup>
    <UButton type="submit" label="Send" />
  </UForm>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const schema = object({
  statement: string().required('Say something, please.'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  statement: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  alert(event.data)
  console.log(event.data)
}
</script>

<style lang="scss" scoped></style>
