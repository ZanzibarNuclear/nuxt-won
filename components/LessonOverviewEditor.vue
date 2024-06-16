<template>
  <div v-if="isEdit">
    <LessonPlanForm
      :course-id="course.id"
      :lesson-plan="lesson"
      @save-lesson-plan="handleSaveLesson"
      @cancel="handleCancelUpdateLesson"
    />
  </div>
  <div v-else>
    <div v-if="lesson">
      <div>Public Key: {{ lesson.publicKey }}</div>
      <h3>{{ lesson.title }}</h3>
      <div v-if="lesson.coverArt">
        <NuxtImg :src="lesson.coverArt" :alt="lesson.title" width="300px" />
      </div>
      <UCard class="rich-text">
        <template #header
          >Description: <span v-html="lesson.description"
        /></template>
        Objective:
        <div><span v-html="lesson.objective" /></div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['course', 'lesson'])

const isEdit = ref(false)

const handleSaveLesson = () => {}
const handleCancelUpdateLesson = () => {}
</script>

<style scoped></style>
