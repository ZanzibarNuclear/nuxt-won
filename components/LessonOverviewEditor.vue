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
    <div>Public Key: {{ publicKey }}</div>
    <h3>{{ title }}</h3>
    <div v-if="coverArt">
      <NuxtImg :src="coverArt" :alt="title" width="300px" />
    </div>
    <UCard class="rich-text">
      <template #header>Description: <span v-html="description" /></template>
      Objective:
      <div><span v-html="objective" /></div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['course', 'lesson'])

const { publicKey, coverArt, title, description, objective } = props.lesson

const isEdit = ref(false)

const handleSaveLesson = () => {}
const handleCancelUpdateLesson = () => {}
</script>

<style scoped></style>
