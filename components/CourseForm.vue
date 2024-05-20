<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Title" name="title">
      <UInput v-model="state.title" />
    </UFormGroup>
    <UFormGroup label="Description" name="description">
      <UInput v-model="state.description" />
    </UFormGroup>
    <UFormGroup label="Syllabus" name="syllabus">
      <UInput v-model="state.syllabus" />
    </UFormGroup>
    <UFormGroup label="Cover Art" name="coverArt">
      <UInput v-model="state.coverArt" />
    </UFormGroup>
    <UButton type="submit">Add Course</UButton>
  </UForm>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
const emit = defineEmits(['save-course'])

const schema = object({
  title: string().required(),
  description: string(),
  syllabus: string(),
  coverArt: string(),
})
type Schema = InferType<typeof schema>
const state = {
  title: undefined,
  description: undefined,
  syllabus: undefined,
  coverArt: undefined,
}
async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
  emit('save-course', event.data)
}
</script>

<style scoped>
form {
  border: 5px lightblue groove;
  padding: 2rem 3rem;
}
</style>
