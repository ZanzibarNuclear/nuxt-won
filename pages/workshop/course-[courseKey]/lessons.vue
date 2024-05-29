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
          @click="onActivateLesson(lesson.publicKey)"
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
            `/workshop/course-${workshop.activeCourse?.publicKey}/lesson-${lessonToEdit?.publicKey}`
          )
        "
        label="Work on lesson content"
        class="mx-1"
      />
      <UButton
        @click="
          navigateTo(
            `/workshop/course-${workshop.activeCourse?.publicKey}/preview-${lessonToEdit?.publicKey}`
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
import { loadCourse } from '~/db/CourseModel'
import {
  loadLessonPlans,
  createLessonPlan,
  saveLessonPlan,
} from '~/db/LessonPlanModel'

const route = useRoute()
const workshop = useWorkshopStore()
const uiState = reactive({
  addLesson: false,
  editLesson: false,
})

const courseKey = route.params.courseKey
const isActiveLesson = computed(() => !!workshop.activeLesson)
const lessonToEdit = computed(() => workshop.activeLesson)

const onActivateLesson = (publicKey) => {
  workshop.activateLesson(publicKey)
}
const cancelActive = () => workshop.closeLessonEdit()

const courseTitle = computed(() =>
  workshop.isCourseActive ? workshop.activeCourse.title : 'Loading...'
)

const { data: courseData, error } = await useAsyncData(
  `course-${courseKey}`,
  async () => {
    const [course, lessonPlans] = await Promise.all([
      loadCourse(courseKey),
      loadLessonPlans(courseKey),
    ])
    return { course, lessonPlans }
  }
)
const course = courseData.value
const lessonPlans = courseData.value
workshop.cacheCourse(course)
workshop.activateCourse(course.publicKey)
workshop.cacheLessons(lessonPlans)

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
