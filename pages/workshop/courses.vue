<template>
  <h1>Curriculum Workshop &ndash; Courses</h1>
  <div v-if="!isActiveCourse" class="rich-text">
    <ul>
      <li
        v-for="course in workshop.courseList"
        @click="onActivateCourse(course.id)"
      >
        {{ course.title }} - ({{ course.publicKey }})
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
    <h2>Make this course awesome!!</h2>
    <SimpleToolbar>
      <UButton
        icon="i-ph-pencil"
        @click="() => (uiState.editCourse = true)"
        label="Edit course"
        variant="solid"
        class="mx-1"
      />
      <UButton
        icon="i-ph-presentation-chart-duotone"
        @click="
          navigateTo(`/workshop/course-${workshop.activeCourse.id}/lessons`)
        "
        label="Work on lessons"
        variant="solid"
        class="mx-1"
      />
      <UButton
        icon="i-ph-arrow-bend-up-left-duotone"
        @click="cancelActive"
        label="Back to course list"
        variant="solid"
        class="mx-1"
      />
    </SimpleToolbar>
    <div v-if="!uiState.editCourse" class="rich-text">
      <h3>Title: {{ workshop.activeCourse.title }}</h3>
      <div>
        <img :src="workshop.activeCourse.coverArt" width="250px" class="my-6" />
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
        :course="courseToEdit"
        @cancel="onCancelUpdateCourse"
      />
    </div>
  </div>
</template>

<script setup>
import {
  loadCourses,
  loadCourseById,
  createCourse,
  saveCourse,
} from '~/db/CourseModel'

const workshop = useWorkshopStore()
const uiState = reactive({
  addCourse: false,
  editCourse: false,
})

const isActiveCourse = computed(() => !!workshop.activeCourse)
const cancelActive = () => workshop.closeCourseEdit()
const courseToEdit = computed(() => workshop.activeCourse)
const onActivateCourse = async (id) => {
  const course = await loadCourseById(id)
  if (course) {
    workshop.cacheCourse(course)
    workshop.editCourse(id)
  }
}

onMounted(async () => {
  const courses = await loadCourses()
  if (courses) {
    workshop.cacheCourses(courses)
  }
})

const onCreateCourse = async (details) => {
  const minted = await createCourse(details)
  if (minted) {
    console.log('added course', minted)
    workshop.cacheCourse(minted)
  }
  uiState.addCourse = false
}
const onCancelCreateCourse = () => (uiState.addCourse = false)
const onCancelUpdateCourse = () => (uiState.editCourse = false)

const onSaveCourse = async (details) => {
  const updated = await saveCourse(details)
  if (updated) {
    console.log('saved course', updated)
    workshop.cacheCourse(updated)
  }
  uiState.editCourse = false
}
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
