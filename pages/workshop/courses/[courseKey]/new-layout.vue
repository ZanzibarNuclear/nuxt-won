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
        <!-- <template #header>
          <p
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ item.label }}
          </p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ item.description }}
          </p>
        </template> -->

        <div v-if="item.key === 'overview'" class="space-y-3">
          <CourseOverviewBuilder />
        </div>
        <div v-else-if="item.key === 'lessons'" class="space-y-3">
          <h3>Component for managing lessons goes here</h3>
        </div>
        <div v-else-if="item.key === 'paths'" class="space-y-3">
          <h3>Component for managing paths goes here</h3>
        </div>
        <!-- <template #footer>
          <UButton type="submit" color="black">
            Save {{ item.key === 'account' ? 'account' : 'password' }}
          </UButton>
        </template> -->
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
