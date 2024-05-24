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

onMounted(async () => {
  const courses = await loadCourses()
  courses.forEach((course) => learning.cacheCourse(course))
})
</script>

<style scoped>
.course-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
}
</style>
