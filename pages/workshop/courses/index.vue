<template>
  <h1>Curriculum Workshop &ndash; Courses</h1>
  <div>
    <UButton
      v-if="!uiState.addCourse"
      label="Add Course"
      icon="i-ph-plus-circle"
      @click="() => (uiState.addCourse = true)"
    />
    <UModal v-model="uiState.addCourse" prevent-close>
      <CourseForm
        @save-course="onCreateCourse"
        @cancel="onCancelCreateCourse"
      />
    </UModal>
  </div>

  <div class="course-list-item" v-for="course in workshop.courseList">
    <h3 class="clickable-item" @click="() => onOpenCourse(course.publicKey)">
      <UIcon name="i-ph-arrow-elbow-down-right-duotone" /> {{ course.title }}
    </h3>
    <div class="rich-text">
      <span v-html="course.description" />
    </div>
  </div>
</template>

<script setup>
import { loadCourses, createCourse } from '~/db/CourseModel'

const workshop = useWorkshopStore()
const uiState = reactive({
  addCourse: false,
})

const { data: courses } = await useAsyncData('courses', () => loadCourses())
workshop.cacheCourses(courses.value)

const onOpenCourse = async (key) => {
  navigateTo(`/workshop/courses/${key}`)
}

const onCreateCourse = async (details) => {
  const minted = await createCourse(details)
  if (minted) {
    workshop.cacheCourse(minted)
  }
  uiState.addCourse = false
}

const onCancelCreateCourse = () => (uiState.addCourse = false)
</script>

<style lang="scss" scoped>
.course-list-item {
  margin: 1rem 0;
  padding: 0.5rem;
  border: 1px dotted gray;
}
.clickable-item {
  cursor: pointer;
}
.course-list-item #hover {
  border-color: blue;
}
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
