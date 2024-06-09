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
      icon="i-mdi-cancel"
      label="Cancel"
      color="amber"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['savePath', 'cancel'])
const props = defineProps(['lessons', 'courseKey'])

const pathData = reactive({
  name: '',
  description: '',
  courseKey: props.courseKey,
  trailhead: '',
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
