<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Title" name="title">
      <UInput v-model="state.title" />
    </UFormGroup>
    <UFormGroup label="Description" name="description">
      <simple-editor
        v-if="descriptionEdit"
        :initial-content="state.description"
        @share-changes="(updates) => handleSaveDescription(updates)"
        @close="handleCloseDescription"
      />
      <div v-if="!descriptionEdit">
        <span v-html="state.description" />
        <UIcon name="i-mdi-edit" @click="descriptionEdit = true" />
      </div>
    </UFormGroup>
    <UFormGroup label="Syllabus" name="syllabus">
      <UInput v-model="state.syllabus" />
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

const SimpleEditor = defineAsyncComponent(
  () => import('~/components/SimpleEditor.vue')
)

const emit = defineEmits(['save-course', 'cancel'])
const props = defineProps(['course'])

const schema = object({
  id: number(),
  title: string().required(),
  description: string(),
  syllabus: string(),
  coverArt: string(),
})
type Schema = InferType<typeof schema>
const state = reactive({
  id: undefined,
  title: undefined,
  description: undefined,
  syllabus: undefined,
  coverArt: undefined,
})

const isEditMode = computed(() => !!props.course)
const descriptionEdit = ref(false)
const handleSaveDescription = (updates) => {
  state.description = updates
  descriptionEdit.value = false
}
const handleOpenDescription = () => {
  descriptionEdit.value = true
}
const handleCloseDescription = () => {
  descriptionEdit.value = false
}
const setDefaults = (course) => {
  const { id, title, description, coverArt, syllabus } = course
  state.id = id
  state.title = title
  state.description = description
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
