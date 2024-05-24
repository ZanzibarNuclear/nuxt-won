<template>
  <div>
    <h1>Learn About Nuclear Energy</h1>
    <div class="mx-auto">
      <h2>Choose a course</h2>
      <div class="course-layout">
        <CourseTile
          v-for="course in courses"
          class="mx-2 my-4"
          :course="course"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadCourses } from '~/db/CourseModel'
import type { Course } from '~/types/won-types'

const courses: Ref<Course[]> = ref([])

onMounted(async () => {
  const publisedCourses = await loadCourses()
  courses.value.push(...publisedCourses)
})
</script>

<style scoped>
.course-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
