<template>
  <div>
    <h1>Curriculum Workshop: {{ courseTitle }}</h1>
    <UIcon name="mdi-arrow-left-top" />
    <h2>Lesson Builder</h2>
    <div v-if="!isActiveLesson">
      <div class="mb-2 italic">Lessons in this course</div>
      <ol>
        <li
          v-for="lesson in workshop.lessonList"
          @click="activateLesson(lesson.id)"
        >
          {{ lesson.title }}
        </li>
      </ol>
      <div>
        <div v-if="!uiState.addLesson" class="mt-2">
          <strong>Actions:</strong>
          <UButton
            label="Add Lesson"
            @click="() => (uiState.addLesson = true)"
            class="mx-1"
          />
          <UButton
            label="Change lesson order"
            @click="console.log('implement')"
            class="mx-1"
          />
        </div>
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
    <h2>Make this the Best Lesson Ever!!</h2>
    <div>
      <strong>Actions:</strong>
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
      <UButton @click="cancelActive" label="Put this away" class="mx-1" />
    </div>
    <div v-if="!uiState.editLesson">
      <div>Public Key: {{ lessonToEdit?.publicKey }}</div>
      <h3>{{ lessonToEdit?.title }}</h3>
      <div>
        <img
          src="https://worldofnuclear.com/images/atomic-symbol.jpg"
          width="300px"
        />
        <div>Cover Art: {{ lessonToEdit?.coverArt }}</div>
      </div>
      <UCard>
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

const courseId = computed(() => parseInt(route.params.id))
const isActiveLesson = computed(() => !!workshop.activeLesson)
const cancelActive = () => workshop.closeLessonEdit()
const lessonToEdit = computed(() => workshop.activeLesson)
const activateLesson = (id) => {
  // TODO: any need to load lesson again? maybe check if already cached
  workshop.editLesson(id)
}

const courseTitle = computed(() => workshop.activeCourse?.title || 'Loading...')
onMounted(async () => {
  if (!workshop.isActiveCourse) {
    const course = await loadCourse(courseId.value)
    if (course) {
      console.log('caching course', course)
      workshop.addCourse(course)
      workshop.editCourse(course.id)
    }
  }
  const lessons = await loadLessonPlans(courseId.value)
  if (lessons?.length > 0) {
    console.log('caching lessons', lessons)
    workshop.loadLessons(lessons)
  }
})

const handleCreateLesson = async (details) => {
  console.log('add new lesson to course', details)
  const minted = await createLessonPlan(details)
  if (minted) {
    console.log('added lesson plan', minted)
    workshop.addLesson(minted)
  }
  uiState.addLesson = false
}
const handleCancelCreateLesson = () => (uiState.addLesson = false)
const handleCancelUpdateLesson = () => (uiState.editLesson = false)

const handleSaveLesson = async (details) => {
  const updated = await saveLessonPlan(details)
  if (updated) {
    workshop.addLesson(updated)
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
</style>
