<template>
  <div>
    <h1>{{ activeCourse.title }}</h1>
    <div>Description</div>
    <div>
      <h3>Lessons</h3>
      <ul>
        <li v-for="lesson in lessons" class="my-6 px-4">
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
  // see if course is cached
  if (!learning.useCourse(courseKey)) {
    // not cached, so fetch it, cache it, and make it active
    const course = await loadCourse(courseKey)
    learning.cacheCourse(course)
    learning.useCourse(courseKey)
  }

  const plans: LessonPlan[] = await loadLessonPlans(courseKey)
  console.log('found lessons:', plans)

  if (plans) {
    lessons.value.push(...plans)
  }
})
</script>

<style scoped></style>
