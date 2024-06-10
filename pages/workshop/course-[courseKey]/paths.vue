<template>
  <div>Set up paths through the course</div>
</template>

<script setup lang="ts">
import { loadLessonPaths } from '~/db/LessonPathModel'
const route = useRoute()
const { courseKey } = route.params

const { data: paths, error } = await useAsyncData(
  `course-${courseKey}-paths`,
  () => loadLessonPaths(courseKey)
)

console.log(paths.value)
</script>

<style scoped></style>
