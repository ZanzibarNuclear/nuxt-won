<template>
  <div class="space-y-4">
    <h2>Lesson Path</h2>
    <div>Course Key: {{ pathData.courseKey }}</div>
    <UFormGroup
      label="Path name"
      description="Give the path an attractive name"
    >
      <UInput v-model="pathData.name" />
    </UFormGroup>
    <UFormGroup
      label="Description"
      description="Brief description of the advantage of this path over another"
    >
      <UInput v-model="pathData.description" />
    </UFormGroup>
    <UFormGroup
      label="Trailhead"
      description="Pick the first lesson along the path"
    >
      <USelect v-model="pathData.trailhead" :options="allLessons" />
    </UFormGroup>
    <UButton @click="onSavePath" icon="i-ph-plus-circle" label="Save Path" />
    <UButton
      class="ml-2"
      @click="onCancel"
      icon="i-ph-pencil-slash"
      label="Cancel"
      color="amber"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['savePath', 'cancel'])
const props = defineProps(['lessons', 'courseKey', 'path'])

const pathData = reactive({
  name: '',
  description: '',
  trailhead: '',
  publicKey: '',
  courseKey: props.courseKey,
})

onMounted(() => {
  const { path } = props
  if (path) {
    pathData.name = path.name
    pathData.description = path.description
    pathData.trailhead = path.trailhead
    pathData.courseKey = path.courseKey
    pathData.publicKey = path.publicKey
  }
})

const allLessons = computed(() => {
  return props.lessons.map((lesson) => ({
    label: lesson.title,
    value: lesson.publicKey,
  }))
})

const onSavePath = () => {
  emit('savePath', pathData)
}
const onCancel = () => {
  emit('cancel', pathData)
  pathData.name = ''
  pathData.description = ''
  pathData.trailhead = ''
}
</script>

<style scoped></style>
