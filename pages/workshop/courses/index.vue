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

  <h3>Published</h3>
  <div class="course-list-item" v-for="course in publishedCourses">
    <div class="clickable-item" @click="() => onOpenCourse(course.publicKey)">
      <UIcon name="i-ph-arrow-elbow-down-right-duotone" /> {{ course.title }}
    </div>
  </div>

  <h3>Draft</h3>
  <div class="course-list-item" v-for="course in draftCourses">
    <div class="clickable-item" @click="() => onOpenCourse(course.publicKey)">
      <UIcon name="i-ph-arrow-elbow-down-right-duotone" /> {{ course.title }}
    </div>
  </div>

  <h3>For Testing</h3>
  <div class="course-list-item" v-for="course in testCourses">
    <div class="clickable-item" @click="() => onOpenCourse(course.publicKey)">
      <UIcon name="i-ph-arrow-elbow-down-right-duotone" /> {{ course.title }}
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

const publishedCourses = computed(() =>
  workshop.courseList.filter((c) => c.publishedAt && !c.testOnly)
)
const draftCourses = computed(() =>
  workshop.courseList.filter((c) => !(c.publishedAt || c.testOnly))
)
const testCourses = computed(() =>
  workshop.courseList.filter((c) => c.testOnly)
)

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
  margin: 0.5rem 0;
  padding: 0.25rem;
  border: 1px dotted gray;
}
.clickable-item {
  cursor: pointer;
}
.course-list-item:hover {
  background-color: theme('colors.blue.200');
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
