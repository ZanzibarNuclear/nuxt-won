<template>
  <div>
    <UBreadcrumb :links="breadcrumbLinks" />
    <h1>Topics of Interest</h1>
    <div class="mx-auto">
      <div class="course-layout">
        <CourseTile
          v-for="course in learning.publishedCourses"
          class="mx-2 my-4"
          :course="course"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadCourses } from '~/db/CourseModel'

const breadcrumbLinks = [
  {
    label: 'Courses',
    icon: 'i-ph-house-line',
  },
]

const learning = useLearningStore()

async function loadData() {
  const { data: courses, error } = await useAsyncData('courses', () =>
    loadCourses()
  )
  if (courses.value) {
    courses.value.forEach((course) => learning.cacheCourse(course))
  }
  if (error.value) {
    console.error('Something went wrong', error.value?.message)
  }
}
await loadData()
</script>

<style scoped>
.course-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
}
</style>
