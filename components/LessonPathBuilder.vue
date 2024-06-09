<template>
  <div>
    <UButton
      v-if="!uiState.openAddPath"
      icon="i-ph-plus-circle"
      label="Add Path"
      @click="uiState.openAddPath = true"
    />
    <UModal v-model="uiState.openAddPath">
      <LessonPathForm
        :lessons="workshop.lessonList"
        :course-key="courseKey"
        @save-path="onAddPath"
        @cancel="onCancelAddPath"
        class="p-6"
      />
    </UModal>
    <h3>We have the following paths.</h3>
    <div v-if="!lessonPaths?.length" class="italic">
      Create at least one path through this amazing course.
    </div>
    <div v-else>
      <div v-for="path in lessonPaths" class="list-item">
        <div class="path-grid">
          <div>{{ path.name }}</div>
          <div>{{ path.description }}</div>
          <div class="bookend">
            <UButton
              v-if="!uiState.openEditPath"
              icon="i-ph-pencil"
              @click="() => onOpenEditPath(path)"
            />
            <UButton
              class="ml-1"
              icon="i-ph-path"
              @click="() => onOpenSteps(path)"
            />
            <UButton
              class="ml-6"
              icon="i-ph-x-circle"
              color="amber"
              @click="() => onDeletePath(path.publicKey)"
            />
          </div>
        </div>
      </div>
    </div>
    <UModal v-model="uiState.openEditPath">
      <LessonPathForm
        :lessons="workshop.lessonList"
        :course-key="courseKey"
        :path="openPath"
        @save-path="onSavePath"
        @cancel="onCancelEditPath"
        class="p-6"
      />
    </UModal>
    <div v-if="uiState.openSteps">
      <h3>Steps for {{ openPath.name }}</h3>
      <div class="mb-4">The trailhead lesson is: {{ openPath.trailhead }}</div>
      <div>
        <h3>Add a step</h3>
        <LessonStepForm
          :lessons="workshop.lessonList"
          @save-step="onCreateStep"
        />
      </div>
      <div class="ml-4" v-for="step in openPath.steps">
        From {{ step.from }} to {{ step.to }} : {{ step.teaser }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  createLessonPath,
  saveLessonPath,
  deleteLessonPath,
} from '~/db/LessonPathModel'

const props = defineProps(['lessonPaths', 'courseKey'])
const workshop = useWorkshopStore()
const uiState = reactive({
  openAddPath: false,
  openEditPath: false,
  openSteps: false,
})

const openPath = ref()
const stepsOnOpenPath = ref([])
const lessonNameMap = ref({}) // key : { name }
const stepMap = reactive({})

function setupStepMap(steps) {
  if (steps) {
    steps.forEach((step) => {
      stepMap[step.from] = step
    })
  }
}

const pathFromStart = computed(() => {
  if (!openPath.value || !openPath.value.trailhead) {
    return []
  }
  const steppies = [openPath.value.trailhead]
  return steppies
})

const onAddPath = async (pathData) => {
  const minted = await createLessonPath(pathData)
  console.log('created a path', minted)
  workshop.cacheActiveLessonPath(minted)
  uiState.openAddPath = false
}
const onOpenEditPath = (path) => {
  openPath.value = path
  uiState.openEditPath = true
}
const onOpenSteps = (path) => {
  openPath.value = path
  setupStepMap(path.steps)
  uiState.openSteps = true
}
const onSavePath = async (pathData) => {
  const delta = await saveLessonPath(pathData)
  console.log('updated path', delta)
  workshop.cacheActiveLessonPath(delta)
  uiState.openEditPath = false
}
const onCancelAddPath = () => {
  uiState.openAddPath = false
}
const onCancelEditPath = () => {
  uiState.openEditPath = false
}
const onDeletePath = async (pathKey: string) => {
  await deleteLessonPath(pathKey)
  workshop.removeActiveLessonPath(pathKey)
}

const onCreateStep = (step) => {
  console.log('create step', step)

  // TODO: use model and update local copy
}
const onSaveStep = (step) => {
  console.log('save step', step)
  // TODO: use model and update local copy
}
const onDeleteStep = (step) => {
  console.log('delete step', step)
  // TODO: use model and update local copy
}
</script>

<style scoped>
ul {
  list-style: circle inside;
  margin-bottom: 1.5rem;
}
.path-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}
.list-item {
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px lightcoral dotted;
  list-style: none;
}
.bookend {
  justify-self: end;
}
</style>
