<template>
  <div>
    <h1>{{ activeCourse.title }}</h1>
    <div>Description</div>
    <div>
      <h3>Lessons</h3>
      <ol>
        <li v-for="lesson in lessons">{{ lesson.title }}</li>
      </ol>
    </div>
    <h3>Syllabus</h3>
    <div>syllabus</div>
  </div>
</template>

<script setup lang="ts">
import { loadCourse } from '~/db/CourseModel'
import { loadLessonPlans } from '~/db/LessonPlanModel'
import type { LessonPlan } from '~/types/won-types'

const learning = useLearningStore()

const route = useRoute()
const courseKey = route.params.key
const lessons: Ref<LessonPlan[]> = ref([])

const activeCourse = computed(() => {
  if (learning.activeCourse) {
    return learning.activeCourse
  } else {
    return {
      title: 'This may be the course you are looking for...loading...',
    }
  }
})

onMounted(async () => {
  const course = await loadCourse(courseKey)
  if (course) {
    learning.cacheCourse(course)
  }
  const plans: LessonPlan[] = await loadLessonPlans(courseKey)
  console.log('found lessons:', plans)

  if (plans) {
    lessons.value.push(...plans)
  }
})
</script>

<style scoped>
ol {
  list-style-type: decimal;
  list-style-position: inside;
}
</style>
