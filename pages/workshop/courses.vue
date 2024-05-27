<template>
  <UContainer>
    <h1>Curriculum Builder's Workshop</h1>
    <h2>Course Library</h2>
    <div v-if="!isActiveCourse" class="rich-text">
      <ul>
        <li
          v-for="course in workshop.courseList"
          @click="activateCourse(course.id)"
        >
          {{ course.title }} -
          <span v-html="course.description" />
        </li>
      </ul>
      <div>
        <UButton
          v-if="!uiState.addCourse"
          label="Add Course"
          @click="() => (uiState.addCourse = true)"
        />
        <div v-else>
          <h3>Add a Course</h3>
          <CourseForm
            @save-course="onCreateCourse"
            @cancel="onCancelCreateCourse"
          />
        </div>
      </div>
    </div>
    <div v-if="isActiveCourse">
      <h2>Make this Course Awesome</h2>
      <div>
        <strong>Actions:</strong>
        <UButton
          @click="() => (uiState.editCourse = true)"
          label="Edit course"
          class="mx-1"
        />
        <UButton
          @click="
            navigateTo(`/workshop/course-${workshop.activeCourse.id}/lessons`)
          "
          label="Work on lessons"
          class="mx-1"
        />
        <UButton @click="cancelActive" label="Put this away" class="mx-1" />
      </div>
      <div v-if="!uiState.editCourse" class="rich-text">
        <div>Public Key: {{ workshop.activeCourse.publicKey }}</div>
        <h3>{{ workshop.activeCourse.title }}</h3>
        <div>
          <img
            :src="workshop.activeCourse.coverArt"
            width="250px"
            class="my-6"
          />
        </div>
        <div>
          Description: <span v-html="workshop.activeCourse.description" />
        </div>
        Syllabus:
        <div>
          <span v-html="workshop.activeCourse.syllabus" />
        </div>
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
  loadCourseById,
  createCourse,
  saveCourse,
} from '~/db/CourseModel'

// TODO: use Tiptap editor for description and syllabus

const workshop = useWorkshopStore()
const uiState = reactive({
  addCourse: false,
  editCourse: false,
})

const isActiveCourse = computed(() => !!workshop.activeCourse)
const cancelActive = () => workshop.closeCourseEdit()
const courseToEdit = computed(() => workshop.activeCourse)
const activateCourse = async (id) => {
  const course = await loadCourseById(id)
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
.rich-text ::v-deep p {
  margin: 0.75rem 0;
}
.rich-text ::v-deep ul {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: disc;
  list-style-position: inside;
}
</style>
