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
    <div v-if="lesson" class="grid-layout">
      <div class="label">Title:</div>
      <div class="detail">{{ lesson.title }}</div>
      <div class="label">Sequence:</div>
      <div class="detail">{{ lesson.sequence }}</div>
      <div v-if="lesson.coverArt" class="label">Cover art:</div>
      <div v-if="lesson.coverArt" class="detail">
        <NuxtImg :src="lesson.coverArt" :alt="lesson.title" width="150px" />
      </div>
      <div class="label">Description:</div>
      <div class="detail rich-text"><span v-html="lesson.description" /></div>
      <div class="label">Objective:</div>
      <div class="detail rich-text"><span v-html="lesson.objective" /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LearningRepository as repo } from '~/api/wonService/LearningRepo'

defineProps(['course', 'lesson'])

const isEdit = ref(false)

const handleSaveLesson = async (details) => {
  const updated = await repo.updateLessonPlan(details.publicKey, details)
  if (updated) {
    useWorkshopStore().cacheLesson(updated)
  }
  isEdit.value = false
}
const handleCancelUpdateLesson = () => {
  isEdit.value = false
}
</script>
<style lang="scss" scoped>
.grid-layout {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
.grid-layout .label {
  font-weight: bold;
  margin-top: 1rem;
}
.grid-layout .detail {
  margin-top: 1rem;
}
.rich-text :deep(p) {
  margin-bottom: 0.5rem;
}
.rich-text :deep(ul) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: disc;
  list-style-position: inside;
}
.rich-text :deep(ol) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: decimal;
  list-style-position: inside;
}
.rich-text :deep(blockquote) {
  margin-left: 1rem;
  border-left: 2px solid goldenrod;
  padding-left: 1rem;
}
</style>
