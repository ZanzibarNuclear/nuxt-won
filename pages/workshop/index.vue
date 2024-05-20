<template>
  <UContainer>
    <h1>Lesson Workshop</h1>
    <div>
      <h2>Course Library</h2>
      <ul>
        <li
          v-for="course in workshop.courseList"
          @click="() => openForEdit(course.id)"
        >
          {{ course.title }} -
          <span v-html="course.description" />
        </li>
      </ul>
    </div>
    <div>
      <UButton
        v-if="!uiState.addCourseOpen"
        label="Add Course"
        @click="() => (uiState.addCourseOpen = true)"
      />
      <div v-else>
        <h2>Add a Course</h2>
        <CourseForm @save-course="onSaveCourse" />
      </div>
    </div>
    <div v-if="editingCourse">
      <h2>Make this Course Awesome</h2>
      <div v-if="!uiState.editCourse">
        <div>Public Key: {{ workshop.activeCourse.publicKey }}</div>
        <div>Title: {{ workshop.activeCourse.title }}</div>
        <div>Description: {{ workshop.activeCourse.description }}</div>
        <div>Cover Art: {{ workshop.activeCourse.coverArt }}</div>
        <div>Syllabus: {{ workshop.activeCourse.syllabus }}</div>
        <UButton @click="onEditCourse" label="Edit" />
      </div>
      <div v-else>
        <CourseForm :course="workshop.activeCourse" />
      </div>
    </div>
  </UContainer>
</template>

<script setup>
import { loadCourses, loadCourse, saveCourse } from '~/db/CourseModel'

const workshop = useWorkshopStore()
const uiState = reactive({
  addCourseOpen: false,
  editCourse: false,
  addLessonOpen: false,
})

const editingCourse = computed(() => {
  return !!workshop.activeCourse
})

const onEditCourse = () => (uiState.editCourse = true)

const openForEdit = async (id) => {
  const course = await loadCourse(id)
  if (course) {
    workshop.addCourse(course)
    workshop.editCourse(id)
  }
}

onMounted(async () => {
  const courses = await loadCourses()
  if (courses) {
    workshop.loadCourses(courses)
  }
})

const onSaveCourse = async (details) => {
  const result = await saveCourse(details)
  if (result) {
    console.log('saved course', result)
    workshop.addCourse(result)
  }
  uiState.addCourseOpen = false
}
</script>

<style lang="scss" scoped>
ul {
  list-style: disc;
  list-style-position: inside;
}
</style>
