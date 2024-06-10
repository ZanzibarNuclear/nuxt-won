<template>
  <UButton
    icon="i-ph-pencil"
    @click="uiState.editCourse = true"
    label="Edit course"
    variant="solid"
    class="mx-1"
  />
  <div v-if="uiState.editCourse">
    <CourseForm
      @save-course="onSaveCourse"
      :course="workshop.activeCourse"
      @cancel="onCancelUpdateCourse"
    />
  </div>
  <div v-else-if="workshop.isCourseActive" class="rich-text">
    <h2>Title: {{ workshop.activeCourse.title }}</h2>
    <div>
      <NuxtImg
        :src="workshop.activeCourse.coverArt"
        width="250px"
        class="my-6"
      />
    </div>
    <div>
      <h3>Description:</h3>
      <span v-html="workshop.activeCourse.description" />
    </div>
    <div>
      <h3>Syllabus:</h3>
      <span v-html="workshop.activeCourse.syllabus" />
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { saveCourse } from '~/db/CourseModel'

const workshop = useWorkshopStore()

const uiState = reactive({
  editCourse: false,
})

const onSaveCourse = async (details) => {
  const updated = await saveCourse(details)
  if (updated) {
    workshop.cacheCourse(updated)
  }
  uiState.editCourse = false
}
const onCancelUpdateCourse = () => (uiState.editCourse = false)
</script>

<style scoped>
.rich-text :deep(p) {
  margin: 0.75rem 0;
}
.rich-text :deep(ul) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: disc;
  list-style-position: inside;
}
</style>
