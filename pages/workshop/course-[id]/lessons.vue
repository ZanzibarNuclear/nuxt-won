<template>
  <div>
    <h2>Plan and Build Lessons</h2>
    <div>Course ID: {{ $route.params.id }}</div>
    <div>Lessons</div>
    <ul>
      <li v-for="lesson in lessonPlans">{{ lesson.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { loadLessonPlans } from '~/db/LessonPlanModel'
const lessonPlans = ref([])
const route = useRoute()

onMounted(async () => {
  lessonPlans.value = await loadLessonPlans(route.params.id)
})
</script>

<style scoped>
ul {
  list-style: disc;
  list-style-position: inside;
}
</style>
