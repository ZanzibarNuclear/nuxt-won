<template>
  <div v-if="isEdit">
    <LessonPlanForm
      :course-key="course.publicKey"
      :lesson-plan="lesson"
      @save-lesson-plan="handleSaveLesson"
      @cancel="handleCancelUpdateLesson"
    />
  </div>
  <div v-else>
    <UButton @click="() => (isEdit = true)" label="Edit lesson" class="mx-1" />
    <div v-if="lesson">
      <h2>Title: {{ lesson.title }}</h2>
      <div>Sequence: {{ lesson.sequence }}</div>
      <div v-if="lesson.coverArt" class="my-6">
        <NuxtImg :src="lesson.coverArt" :alt="lesson.title" width="150px" />
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
import { saveLessonPlan } from '~/db/LessonPlanModel'

defineProps(['course', 'lesson'])

const isEdit = ref(false)

const handleSaveLesson = async (details) => {
  const updated = await saveLessonPlan(details)
  if (updated) {
    useWorkshopStore().cacheLesson(updated)
  }
  isEdit.value = false
}
const handleCancelUpdateLesson = () => {
  isEdit.value = false
}
</script>
