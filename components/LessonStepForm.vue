<template>
  <div class="space-y-4">
    <h2>Lesson Step</h2>
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
    <UButton @click="onSaveStep" icon="i-ph-plus-circle" label="Save Path" />
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
const props = defineProps(['step', 'lessons'])

const pathData = reactive({
  from: '',
  to: '',
  teaser: '',
})

onMounted(() => {
  const { path } = props
  if (path) {
    pathData.from = path.from
    pathData.to = path.to
    pathData.teaser = path.teaser
    if (path.id) {
      pathData.id = path.id
    }
  }
})

const allLessons = computed(() => {
  return props.lessons.map((lesson) => ({
    label: lesson.title,
    value: lesson.publicKey,
  }))
})

const onSaveStep = () => {
  emit('saveStep', pathData)
}
const onCancel = () => {
  pathData.from = ''
  pathData.to = ''
  pathData.teaser = ''
  if (pathData.id) {
    delete pathData.id
  }
}
</script>

<style scoped>
.side-by-side {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
