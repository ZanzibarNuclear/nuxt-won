<template>
  <div>
    <h1>Curriculum Workshop: {{ courseTitle }} &ndash; Lessons</h1>
    <UButton
      label="Back to course"
      icon="i-mdi-arrow-left-top"
      to="/workshop/courses"
    />
    <div v-if="!isActiveLesson">
      <h2>Lessons in this course</h2>
      <ol>
        <li
          v-for="lesson in workshop.lessonList"
          @click="onActivateLesson(lesson.id)"
        >
          {{ lesson.title }}
        </li>
      </ol>
      <div>
        <SimpleToolbar v-if="!uiState.addLesson">
          <UButton
            label="Add Lesson"
            @click="() => (uiState.addLesson = true)"
            class="mx-1"
          />
          <UButton
            label="Change lesson order"
            @click="console.log('change lesson sequence: not implemented')"
            class="mx-1"
          />
        </SimpleToolbar>
        <div v-if="uiState.addLesson">
          <h3>Add a Lesson</h3>
          <LessonPlanForm
            :course-id="courseId"
            @save-lesson-plan="handleCreateLesson"
            @cancel="handleCancelCreateLesson"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-if="isActiveLesson">
    <h2>Make this the best lesson ever!!</h2>
    <SimpleToolbar>
      <UButton
        @click="() => (uiState.editLesson = true)"
        label="Edit lesson"
        class="mx-1"
      />
      <UButton
        @click="
          navigateTo(
            `/workshop/course-${workshop.activeCourse?.id}/lesson-${lessonToEdit?.id}`
          )
        "
        label="Work on lesson content"
        class="mx-1"
      />
      <UButton
        @click="
          navigateTo(
            `/workshop/course-${workshop.activeCourse?.id}/preview-${lessonToEdit?.id}`
          )
        "
        label="Preview lesson"
        class="mx-1"
      />
      <UButton @click="cancelActive" label="Put this away" class="mx-1" />
    </SimpleToolbar>
    <div v-if="!uiState.editLesson">
      <div>Public Key: {{ lessonToEdit?.publicKey }}</div>
      <h3>{{ lessonToEdit?.title }}</h3>
      <div v-if="lessonToEdit?.coverArt">
        <NuxtImg
          :src="lessonToEdit.coverArt"
          :alt="lessonToEdit.title"
          width="300px"
        />
      </div>
      <UCard class="rich-text">
        <template #header
          >Description: <span v-html="lessonToEdit?.description"
        /></template>
        Objective:
        <div><span v-html="lessonToEdit?.objective" /></div>
      </UCard>
    </div>
    <div v-else>
      <LessonPlanForm
        :course-id="courseId"
        :lesson-plan="lessonToEdit"
        @save-lesson-plan="handleSaveLesson"
        @cancel="handleCancelUpdateLesson"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadCourseById } from '~/db/CourseModel'
import {
  loadLessonPlansByCourseId,
  createLessonPlan,
  saveLessonPlan,
} from '~/db/LessonPlanModel'

const route = useRoute()
const workshop = useWorkshopStore()
const uiState = reactive({
  addLesson: false,
  editLesson: false,
})

const courseId = computed(() => parseInt(route.params.id))
const isActiveLesson = computed(() => !!workshop.activeLesson)
const cancelActive = () => workshop.closeLessonEdit()
const lessonToEdit = computed(() => workshop.activeLesson)
const onActivateLesson = (id) => {
  // TODO: any need to load lesson again? maybe check if already cached
  workshop.editLesson(id)
}

const courseTitle = computed(() =>
  workshop.isCourseActive ? workshop.activeCourse.title : 'Loading...'
)
onMounted(async () => {
  if (!workshop.isCourseActive) {
    console.log('loading course info')
    const course = await loadCourseById(courseId.value)
    if (course) {
      console.log('caching course', course)
      workshop.cacheCourse(course)
      workshop.editCourse(course.id)
    }
  } else {
    console.log('Course is already loaded')
  }
  const lessons = await loadLessonPlansByCourseId(courseId.value)
  if (lessons?.length > 0) {
    console.log('caching lessons', lessons)
    workshop.cacheLessons(lessons)
  }
})

const handleCreateLesson = async (details) => {
  console.log('add new lesson to course', details)
  const minted = await createLessonPlan(details)
  if (minted) {
    console.log('added lesson plan', minted)
    workshop.cacheLesson(minted)
  }
  uiState.addLesson = false
}
const handleCancelCreateLesson = () => (uiState.addLesson = false)
const handleCancelUpdateLesson = () => (uiState.editLesson = false)

const handleSaveLesson = async (details) => {
  const updated = await saveLessonPlan(details)
  if (updated) {
    workshop.cacheLesson(updated)
  }
  uiState.editLesson = false
}
</script>

<style scoped>
ul {
  list-style: disc;
  list-style-position: inside;
}
ol {
  list-style-type: decimal;
  list-style-position: inside;
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
