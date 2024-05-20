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
        v-if="!uiState.addCourse"
        label="Add Course"
        @click="() => (uiState.addCourse = true)"
      />
      <div v-else>
        <h2>Add a Course</h2>
        <CourseForm
          @save-course="onCreateCourse"
          @cancel="onCancelCreateCourse"
        />
      </div>
    </div>
    <div v-if="editingCourse">
      <h2>Make this Course Awesome</h2>
      <div v-if="!uiState.editCourse">
        <div>Public Key: {{ workshop.activeCourse.publicKey }}</div>
        <h3>{{ workshop.activeCourse.title }}</h3>
        <div>
          <img
            src="https://worldofnuclear.com/images/Cherenkov-radiation.jpg"
            width="300px"
          />
          <div>Cover Art: {{ workshop.activeCourse.coverArt }}</div>
        </div>
        <UCard>
          <template #header
            >Description: <span v-html="workshop.activeCourse.description"
          /></template>
          Syllabus:
          <div><span v-html="workshop.activeCourse.syllabus" /></div>
        </UCard>
        <UButton
          @click="() => (uiState.editCourse = true)"
          label="Edit"
          class="mr-2"
        />
        <UButton
          @click="() => workshop.closeCourseEdit()"
          label="Clear course view"
        />
      </div>
      <div v-else>
        <CourseForm
          @save-course="onSaveCourse"
          :course="courseToEdit"
          @cancel="onCancelUpdateCourse"
        />
      </div>
    </div>
  </UContainer>
</template>

<script setup>
import {
  loadCourses,
  loadCourse,
  createCourse,
  saveCourse,
} from '~/db/CourseModel'

const workshop = useWorkshopStore()
const uiState = reactive({
  addCourse: false,
  editCourse: false,
})

const editingCourse = computed(() => {
  return !!workshop.activeCourse
})
const cancelActive = () => {
  workshop.closeCourseEdit()
}
const courseToEdit = computed(() => {
  return workshop.activeCourse
})

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

const onCreateCourse = async (details) => {
  console.log('add new course to library', details)
  const minted = await createCourse(details)
  if (minted) {
    console.log('added course', minted)
    workshop.addCourse(minted)
  }
  uiState.addCourse = false
}
const onCancelCreateCourse = () => (uiState.addCourse = false)
const onCancelUpdateCourse = () => (uiState.editCourse = false)

const onSaveCourse = async (details) => {
  console.log('save course changes', details)
  const updated = await saveCourse(details)
  if (updated) {
    console.log('saved course', updated)
    workshop.addCourse(updated)
  }
  uiState.editCourse = false
}
</script>

<style lang="scss" scoped>
ul {
  list-style: disc;
  list-style-position: inside;
}
</style>
