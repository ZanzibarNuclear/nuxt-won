<template>
  <div>
    <h1>Learn About Nuclear Energy</h1>
    <div class="mx-auto">
      <h2>Choose a course</h2>
      <div class="course-layout">
        <CourseTile
          v-for="course in learning.courseList"
          class="mx-2 my-4"
          :course="course"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadCourses } from '~/db/CourseModel'

const learning = useLearningStore()
const { data: courses, error } = await useAsyncData('courses', () =>
  loadCourses()
)
console.log(useNuxtApp().payload.data)

if (courses.value) {
  courses.value.forEach((course) => learning.cacheCourse(course))
}
if (error.value) {
  console.error('Something went wrong', error.value?.message)
}
</script>

<style scoped>
.course-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
}
</style>
