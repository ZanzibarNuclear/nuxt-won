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
  </UContainer>
</template>

<script setup>
import { loadCourses, saveCourse } from '~/db/CourseModel'

const workshop = useWorkshopStore()
const uiState = reactive({
  addCourseOpen: false,
  activeCourse: null,
  editCourseOpen: false,
  addLessonOpen: false,
})

const openForEdit = (id) => {
  workshop.editCourse(id)
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
