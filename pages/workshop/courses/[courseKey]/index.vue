<template>
  <h1>Curriculum Workshop &ndash; Courses</h1>
  <h2>Title: {{ workshop.activeCourse.title }}</h2>
  <SimpleToolbar>
    <UButton
      icon="i-ph-pencil"
      @click="uiState.editCourse = true"
      label="Edit course"
      variant="solid"
      class="mx-1"
    />
    <UButton
      icon="i-ph-presentation-chart-duotone"
      @click="
        navigateTo(
          `/workshop/course-${workshop.activeCourse.publicKey}/lessons`
        )
      "
      label="Work on lessons"
      variant="solid"
      class="mx-1"
    />
    <UButton
      icon="i-ph-arrow-bend-up-left-duotone"
      @click="onGoToCourseList"
      label="Back to course list"
      variant="solid"
      class="mx-1"
    />
  </SimpleToolbar>
  <div v-if="!uiState.editCourse" class="rich-text">
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
  <div v-else>
    <CourseForm
      @save-course="onSaveCourse"
      :course="workshop.activeCourse"
      @cancel="onCancelUpdateCourse"
    />
  </div>
</template>

<script setup>
import { loadCourse, saveCourse } from '~/db/CourseModel'

const { courseKey } = useRoute().params
const workshop = useWorkshopStore()

const uiState = reactive({
  editCourse: false,
})

// make sure requested course is active
if (!workshop.isCourseActive || workshop.activeCourse.publicKey !== courseKey) {
  const cachedCourse = workshop.getCourse(courseKey)

  // load and cache if necessary
  if (!cachedCourse) {
    const { data: course, error } = await useAsyncData(
      `course-${courseKey}`,
      () => loadCourse(courseKey)
    )
    workshop.cacheCourse(course.value)
  }
  workshop.makeCourseActive(courseKey)
}

const onGoToCourseList = () => {
  workshop.deactivateCourse()
  navigateTo('/workshop/courses')
}

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
