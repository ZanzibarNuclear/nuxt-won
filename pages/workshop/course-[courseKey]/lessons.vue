<template>
  <div>
    <h1>
      <UButton
        icon="i-mdi-arrow-left-top"
        class="mr-2"
        to="/workshop/courses"
      />Course:
      {{ courseTitle }}
    </h1>
    <h2>Lesson Builder</h2>
    <div v-if="!workshop.isLessonActive">
      <div v-if="!uiState.addLesson">
        <SimpleToolbar class="my-6">
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
        <h3>Lessons in this course</h3>
        <ol>
          <li v-for="lesson in workshop.lessonList" class="my-6 px-4">
            <LessonListItem :lesson-plan="lesson" />
          </li>
          <!-- <li
            v-for="lesson in workshop.lessonList"
            @click="onActivateLesson(lesson.publicKey)"
          >
            {{ lesson.title }}
          </li> -->
        </ol>
      </div>
      <div>
        <div v-if="uiState.addLesson">
          <h3>Add a Lesson</h3>
          <LessonPlanForm
            :course-id="workshop.activeCourse.id"
            @save-lesson-plan="handleCreateLesson"
            @cancel="handleCancelCreateLesson"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-if="workshop.isLessonActive">
    <SimpleToolbar class="my-6">
      <UButton
        @click="() => (uiState.editLesson = true)"
        label="Edit lesson"
        class="mx-1"
      />
      <UButton
        @click="
          navigateTo(
            `/workshop/course-${workshop.activeCourse?.publicKey}/lesson-${workshop.activeLesson?.publicKey}`
          )
        "
        label="Work on lesson content"
        class="mx-1"
      />
      <UButton
        @click="
          navigateTo(
            `/workshop/course-${workshop.activeCourse?.publicKey}/preview-${workshop.activeLesson?.publicKey}`
          )
        "
        label="Preview lesson"
        class="mx-1"
      />
      <UButton @click="cancelActive" label="Put this away" class="mx-1" />
    </SimpleToolbar>
    <div v-if="!uiState.editLesson">
      <div>Public Key: {{ workshop.activeLesson?.publicKey }}</div>
      <h3>{{ workshop.activeLesson?.title }}</h3>
      <div v-if="workshop.activeLesson?.coverArt">
        <NuxtImg
          :src="workshop.activeLesson.coverArt"
          :alt="workshop.activeLesson.title"
          width="300px"
        />
      </div>
      <UCard class="rich-text">
        <template #header
          >Description: <span v-html="workshop.activeLesson?.description"
        /></template>
        Objective:
        <div><span v-html="workshop.activeLesson?.objective" /></div>
      </UCard>
    </div>
    <div v-else>
      <LessonPlanForm
        :course-id="workshop.activeCourse.id"
        :lesson-plan="workshop.activeLesson"
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

const onActivateLesson = (publicKey) => {
  workshop.activateLesson(publicKey)
  uiState.editLesson = true
}
const cancelActive = () => {
  workshop.deactivateLesson()
  uiState.editLesson = false
}
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
    console.log('returning course and lesson plans')

    return { course, lessonPlans }
  }
)
console.log('using course and lesson plans', courseData.value)
const { course, lessonPlans } = courseData.value
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
