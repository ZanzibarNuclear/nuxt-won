<template>
  <h1>
    <UButton icon="i-mdi-arrow-left-top" class="mr-2" @click="onGoToCourse" />
    Lesson Builder
  </h1>
  <UTabs :items="items" class="w-full">
    <template #item="{ item }">
      <UCard>
        <template #header>
          {{ item.description }}
        </template>

        <div v-if="item.key === 'overview'" class="space-y-3">
          <h2>Lesson Overview</h2>
          <LessonOverviewEditor
            :course="workshop.activeCourse"
            :lesson="workshop.activeLesson"
          />
        </div>
        <div v-else-if="item.key === 'content'" class="space-y-3">Content</div>
        <div v-if="item.key === 'sequence'" class="space-y-3">
          Content Sequence
          <Sequencerator
            :items-to-sequence="partsToReorder"
            @save-sequence="handleSaveSortOrder"
          />
        </div>

        <template #footer>
          <div>Have a splendid life!</div>
        </template>
      </UCard>
    </template>
  </UTabs>
</template>

<script setup lang="ts">
import { loadCourse } from '~/db/CourseModel'
import {
  loadLessonPlans,
  createLessonPlan,
  saveLessonPlan,
  deleteLessonPlan,
} from '~/db/LessonPlanModel'

const { courseKey, lessonKey } = useRoute().params
const workshop = useWorkshopStore()

console.log(
  'Working on lesson ' + lessonKey + ' which is part of course ' + courseKey
)

const partsToReorder = ref([])
const handleSaveSortOrder = (delta) => {
  console.log('==> implement save', delta)
}

const onGoToCourse = () => {
  navigateTo(`/workshop/courses/${courseKey}`)
}

const items = [
  {
    key: 'overview',
    label: 'Overview',
    description: 'Information about the lesson.',
  },
  {
    key: 'content',
    label: 'Content',
    description: 'Add, edit, and remove content parts.',
  },
  {
    key: 'sequence',
    label: 'Content Sequence',
    description: 'Sequence of content parts.',
  },
]

async function loadData() {
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
  workshop.makeCourseActive(courseKey)
  workshop.cacheLessons(lessonPlans)
  workshop.makeLessonActive(lessonKey)
}
await loadData()
</script>

<style scoped></style>
