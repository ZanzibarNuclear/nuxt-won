<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <h2>{{ heading }}</h2>
    <UFormGroup label="Title" name="title">
      <UInput id="title" v-model="state.title" />
    </UFormGroup>
    <SimpleEditorFormGroup :fields="state" field-name="teaser" />
    <SimpleEditorFormGroup :fields="state" field-name="description" />
    <SimpleEditorFormGroup :fields="state" field-name="syllabus" />
    <UFormGroup label="Cover Art" name="coverArt">
      <UInput id="coverArt" v-model="state.coverArt" />
    </UFormGroup>
    <UButton
      type="submit"
      :label="isEdit ? 'Submit changes' : 'Add course'"
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

const SimpleEditor = defineAsyncComponent(
  () => import('~/components/SimpleEditor.vue')
)

const emit = defineEmits(['save-course', 'cancel'])
const props = defineProps({
  course: { type: Object, required: true },
  heading: { type: String, default: 'Course Information' },
})

const schema = object({
  id: number(),
  publicKey: string().nullable(),
  title: string().required(),
  description: string().nullable(),
  teaser: string().nullable(),
  syllabus: string().nullable(),
  coverArt: string().nullable(),
})
type Schema = InferType<typeof schema>
const state = reactive({
  id: undefined,
  publicKey: undefined,
  title: undefined,
  description: undefined,
  teaser: undefined,
  syllabus: undefined,
  coverArt: undefined,
})

const isEdit = computed(() => !!props.course)

const setDefaults = (course) => {
  const { id, publicKey, title, description, teaser, coverArt, syllabus } =
    course
  state.id = id
  state.publicKey = publicKey
  state.title = title
  state.description = description
  state.teaser = teaser
  state.coverArt = coverArt
  state.syllabus = syllabus
}

onMounted(() => {
  if (props.course) {
    setDefaults(props.course)
  }
})

onUpdated(() => {
  if (props.course) {
    setDefaults(props.course)
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('save-course', event.data)
}
</script>

<style scoped>
form {
  border: 5px lightblue groove;
  padding: 2rem 3rem;
}
</style>
