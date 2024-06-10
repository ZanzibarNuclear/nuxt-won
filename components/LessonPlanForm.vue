<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <h2>{{ heading }}</h2>
    <UFormGroup label="Title" name="title">
      <UInput v-model="state.title" />
    </UFormGroup>
    <SimpleEditorFormGroup :fields="state" field-name="description" />
    <SimpleEditorFormGroup :fields="state" field-name="objective" />
    <UFormGroup label="Cover Art" name="coverArt">
      <UInput v-model="state.coverArt" />
    </UFormGroup>
    <UButton
      type="submit"
      :label="isEdit ? 'Submit changes' : 'Add lesson'"
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

const props = defineProps({
  courseId: { type: Number, required: true },
  lessonPlan: { type: Object, required: false },
  heading: { type: String, default: 'Lesson Information' },
})

const schema = object({
  id: number().nullable(),
  publicKey: string().nullable(),
  courseId: number().nullable(),
  title: string().required(),
  description: string().nullable(),
  objective: string().nullable(),
  coverArt: string().nullable(),
})
type Schema = InferType<typeof schema>
const state = reactive({
  id: undefined,
  publicKey: undefined,
  courseId: undefined,
  title: undefined,
  description: undefined,
  objective: undefined,
  coverArt: undefined,
})

const isEdit = computed(() => !!props.lessonPlan)

const setInitialValues = (lessonPlan) => {
  const { id, publicKey, title, description, coverArt, objective } = lessonPlan
  state.id = id
  state.publicKey = publicKey
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
  console.log('clicked save', event.data)
  emit('save-lesson-plan', event.data)
}
</script>

<style scoped>
form {
  border: 5px lightblue groove;
  padding: 2rem 3rem;
}
</style>
