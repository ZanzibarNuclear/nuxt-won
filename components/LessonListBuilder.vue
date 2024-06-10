<template>
  <div>
    <UButton
      v-if="!uiState.addLesson"
      label="Add Lesson"
      icon="i-ph-plus-circle"
      @click="() => (uiState.addLesson = true)"
    />
    <UModal v-model="uiState.addLesson" prevent-close>
      <LessonPlanForm
        :course-id="workshop.activeCourse.id"
        @save-lesson-plan="onCreateLesson"
        @cancel="onCancelCreateLesson"
      />
    </UModal>
  </div>
  <div v-for="lesson in workshop.lessonList" class="my-6 px-4">
    <div class="flex">
      <LessonListItem
        :lesson-plan="lesson"
        class="mr-6"
        @click="() => onOpenLesson(lesson.publicKey)"
      />
      <UButton
        @click="onDeleteLesson(lesson.publicKey)"
        icon="i-ph-x-circle"
        color="amber"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  loadLessonPlans,
  createLessonPlan,
  deleteLessonPlan,
} from '~/db/LessonPlanModel'

const props = defineProps(['courseKey'])
const emit = defineEmits(['openLesson'])

const workshop = useWorkshopStore()
const uiState = reactive({
  addLesson: false,
  editLesson: false,
})

const { data: lessonPlans } = await useAsyncData(
  `course-${props.courseKey}-lessons`,
  () => loadLessonPlans(props.courseKey)
)
workshop.cacheLessons(lessonPlans.value)

const onCreateLesson = async (details) => {
  console.log('add new lesson to course', details)
  const minted = await createLessonPlan(details)
  if (minted) {
    console.log('added lesson plan', minted)
    workshop.cacheLesson(minted)
  }
  uiState.addLesson = false
}

const onOpenLesson = (lessonKey) => {
  workshop.makeLessonActive(lessonKey)
  emit('openLesson', lessonKey)
}

const onCancelCreateLesson = () => (uiState.addLesson = false)

const onDeleteLesson = async (lessonKey) => {
  const result = await deleteLessonPlan(lessonKey)
  workshop.removeLesson(lessonKey)
}
</script>

<style scoped></style>
