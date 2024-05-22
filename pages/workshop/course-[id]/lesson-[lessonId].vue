<template>
  <div>
    <h3>{{ 'My Awesome Lesson' }}</h3>
    <div>Course: {{ courseId }}, Lesson: {{ lessonId }}</div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { id: courseId, lessonId } = route.params
</script>

<style scoped></style>
