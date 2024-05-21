<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Title" name="title">
      <UInput v-model="state.title" />
    </UFormGroup>
    <UFormGroup label="Description" name="description">
      <UInput v-model="state.description" />
    </UFormGroup>
    <UFormGroup label="Objective" name="objective">
      <UInput v-model="state.objective" />
    </UFormGroup>
    <UFormGroup label="Cover Art" name="coverArt">
      <UInput v-model="state.coverArt" />
    </UFormGroup>
    <UButton
      type="submit"
      :label="isEditMode ? 'Submit changes' : 'Add course'"
      class="mr-2"
    />
    <UButton
      type="button"
      label="Cancel"
      @click="emit('cancel')"
      class="mr-2"
    />
  </UForm>
</template>

<script setup lang="ts">
import { object, string, number, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const emit = defineEmits(['save-lesson-plan', 'cancel'])
const props = defineProps(['courseId', 'lessonPlan'])

const schema = object({
  id: number(),
  courseId: number(),
  title: string().required(),
  description: string(),
  objective: string(),
  coverArt: string(),
})
type Schema = InferType<typeof schema>
const state = reactive({
  id: undefined,
  courseId: undefined,
  title: undefined,
  description: undefined,
  objective: undefined,
  coverArt: undefined,
})

const isEditMode = computed(() => !!props.lessonPlan)

const setInitialValues = (lessonPlan) => {
  const { id, courseId, title, description, coverArt, objective } = lessonPlan
  state.id = id
  state.title = title
  state.description = description
  state.coverArt = coverArt
  state.objective = objective
}

onMounted(() => {
  state.courseId = props.courseId
  if (props.lessonPlan) {
    setInitialValues(props.lessonPlan)
  }
})

onUpdated(() => {
  state.courseId = props.courseId
  if (props.lessonPlan) {
    setInitialValues(props.lessonPlan)
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('save-lesson-plan', event.data)
}
</script>

<style scoped>
form {
  border: 5px lightblue groove;
  padding: 2rem 3rem;
}
</style>
