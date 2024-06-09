<template>
  <div class="space-y-4">
    <div class="side-by-side">
      <div class="mr-4">
        <UFormGroup label="From" description="The lesson one is viewing">
          <USelect v-model="pathData.from" :options="allLessons" />
        </UFormGroup>
      </div>
      <div class="ml-4">
        <UFormGroup label="To" description="The next lesson">
          <USelect v-model="pathData.to" :options="allLessons" />
        </UFormGroup>
      </div>
    </div>
    <UFormGroup
      label="Teaser"
      description="Statement to encourage moving forward to the next lesson."
    >
      <UInput v-model="pathData.teaser" />
    </UFormGroup>
    <UButton @click="onSaveStep" icon="i-ph-plus-circle" label="Save Step" />
    <UButton
      class="ml-2"
      @click="onCancel"
      icon="i-mdi-cancel"
      label="Clear"
      color="amber"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['saveStep'])
const props = defineProps(['pathKey', 'step', 'lessons'])

const pathData = reactive({
  lessonPath: '',
  from: '',
  to: '',
  teaser: '',
})

onMounted(() => {
  const { step, pathKey } = props
  pathData.lessonPath = pathKey
  if (step) {
    pathData.from = step.from
    pathData.to = step.to
    pathData.teaser = step.teaser
    if (step.id) {
      pathData.id = step.id
    }
  }
})

const allLessons = computed(() => {
  return props.lessons.map((lesson) => ({
    label: lesson.title,
    value: lesson.publicKey,
  }))
})

function resetForm() {
  pathData.from = ''
  pathData.to = ''
  pathData.teaser = ''
  if (pathData.id) {
    delete pathData.id
  }
}
const onSaveStep = () => {
  emit('saveStep', { ...pathData })
  resetForm()
}
const onCancel = () => {
  resetForm()
}
</script>

<style scoped>
.side-by-side {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
