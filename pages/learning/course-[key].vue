<template>
  <div>
    <h1>{{ activeCourse.title }}</h1>
    <div>Description</div>
    <div>
      <h3>Lessons</h3>
      <ul>
        <li v-for="lesson in learning.lessonsForActiveCourse" class="my-6 px-4">
          <LessonListItem :lesson-plan="lesson" />
        </li>
      </ul>
    </div>
    <h3>Syllabus</h3>
    <div>syllabus</div>
  </div>
</template>

<script setup lang="ts">
import { loadCourse } from '~/db/CourseModel'
import { loadLessonPlans } from '~/db/LessonPlanModel'

const learning = useLearningStore()

const route = useRoute()
const courseKey = route.params.key

const activeCourse = computed(() => {
  if (learning.activeCourse) {
    return learning.activeCourse
  } else {
    return {
      title: 'This may be the course you are looking for...loading...',
    }
  }
})

const { data: courseData, error } = await useAsyncData(
  `course-${courseKey}`,
  async () => {
    const [course, lessonPlans] = await Promise.all([
      loadCourse(courseKey),
      loadLessonPlans(courseKey),
    ])
    return { course, lessonPlans }
  }
)
learning.cacheCourse(courseData.value?.course)
learning.useCourse(courseKey)
learning.cacheLessons(courseData.value?.lessonPlans)
</script>

<style scoped></style>
