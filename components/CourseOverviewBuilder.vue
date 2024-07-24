<template>
  <div v-if="uiState.editCourse">
    <CourseForm
      @save-course="onSaveCourse"
      :course="workshop.activeCourse"
      @cancel="onCancelUpdateCourse"
    />
  </div>
  <div v-else-if="workshop.isCourseActive" class="rich-text">
    <UButton
      icon="i-ph-pencil"
      @click="uiState.editCourse = true"
      label="Edit course"
      variant="solid"
      class="mx-1"
    />
    <div class="grid-layout">
      <div class="label">Title:</div>
      <div class="detail">{{ workshop.activeCourse.title }}</div>
      <div class="label">Teaser:</div>
      <div class="detail rich-text">
        <span v-html="workshop.activeCourse.teaser" />
      </div>
      <div class="label">Cover art:</div>
      <div class="detail">
        <NuxtImg
          :src="workshop.activeCourse.coverArt"
          width="250px"
          class="my-6"
        />
      </div>
      <div class="label">Description:</div>
      <div class="detail rich-text">
        <span v-html="workshop.activeCourse.description" />
      </div>
      <div class="label">Syllabus:</div>
      <div class="detail rich-text">
        <span v-html="workshop.activeCourse.syllabus" />
      </div>
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
.rich-text :deep(blockquote) {
  margin-left: 1rem;
  border-left: 2px solid goldenrod;
  padding-left: 1rem;
}
</style>
