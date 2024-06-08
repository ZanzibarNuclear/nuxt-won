<template>
  <h1>
    <UButton
      icon="i-mdi-arrow-left-top"
      class="mr-2"
      @click="onGoToCourseList"
    />
    Course Builder
  </h1>
  <UTabs :items="items" class="w-full">
    <template #item="{ item }">
      <UCard
        @submit.prevent="
          () => onSubmit(item.key === 'account' ? accountForm : passwordForm)
        "
      >
        <template #header>
          <h2>
            Course Title: {{ workshop.activeCourse.title }} (key:
            {{ workshop.activeCourse?.publicKey }})
          </h2>
        </template>

        <div v-if="item.key === 'overview'" class="space-y-3">
          <CourseOverviewBuilder />
        </div>
        <div v-else-if="item.key === 'lessons'" class="space-y-3">
          <LessonListBuilder
            v-if="!workshop.isLessonActive"
            :course-key="courseKey"
          />
          <div v-else>Show some course details.</div>
        </div>
        <div v-else-if="item.key === 'paths'" class="space-y-3">
          <h3>Component for managing paths goes here</h3>
        </div>
        <template #footer>
          <div>Have a nice day!</div>
        </template>
      </UCard>
    </template>
  </UTabs>
</template>

<script setup lang="ts">
import { loadCourse, saveCourse } from '~/db/CourseModel'

const { courseKey } = useRoute().params
const workshop = useWorkshopStore()

const uiState = reactive({
  editCourse: false,
})

// make sure requested course is active
if (!workshop.isCourseActive || workshop.activeCourse.publicKey !== courseKey) {
  const cachedCourse = workshop.getCourse(courseKey)

  // load and cache if necessary
  if (!cachedCourse) {
    const { data: course, error } = await useAsyncData(
      `course-${courseKey}`,
      () => loadCourse(courseKey)
    )
    workshop.cacheCourse(course.value)
  }
  workshop.makeCourseActive(courseKey)
}

const onGoToCourseList = () => {
  workshop.deactivateCourse()
  navigateTo('/workshop/courses')
}

const onSaveCourse = async (details) => {
  const updated = await saveCourse(details)
  if (updated) {
    workshop.cacheCourse(updated)
  }
  uiState.editCourse = false
}
const onCancelUpdateCourse = () => (uiState.editCourse = false)

const items = [
  {
    key: 'overview',
    label: 'Overview',
    description: 'Information about the course.',
  },
  {
    key: 'lessons',
    label: 'Lessons',
    description: 'Detailed topics and concepts in digestable modules.',
  },
  {
    key: 'paths',
    label: 'Paths',
    description: 'Sequences of lessons through the course.',
  },
]

// TODO: think about using this for forms
const accountForm = reactive({ name: 'Benjamin', username: 'benjamincanac' })
const passwordForm = reactive({ currentPassword: '', newPassword: '' })
</script>

<style scoped></style>
