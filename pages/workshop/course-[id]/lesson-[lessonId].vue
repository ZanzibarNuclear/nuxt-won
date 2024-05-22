<template>
  <div>
    <h1>Curriculum Workshop: Lesson Builder</h1>
    <UButton
      label="Back to lesson overview"
      icon="i-mdi-arrow-left-top"
      :to="`/workshop/course-${courseId}/lessons`"
    />

    <div>Course: {{ activeCourse.title }}</div>
    <h2>{{ activeLesson.title }}</h2>

    <div>
      <UIcon name="i-ph-plus-circle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadLessonPlan } from '~/db/LessonPlanModel'

const route = useRoute()
const { id: courseId, lessonId } = route.params
const workshop = useWorkshopStore()

const activeCourse = {
  id: courseId,
  title: 'My Wonderful Course',
}
const activeLesson = {
  id: lessonId,
  title: 'My Crafty Lesson',
  courseId: courseId,
}

onMounted(async () => {})
</script>

<style scoped></style>
