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
            :course-key="courseKey"
            @open-lesson="onOpenLesson"
          />
        </div>
        <div v-else-if="item.key === 'paths'" class="space-y-3">
          <LessonPathBuilder :lesson-paths="lessonPaths" />
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
import { loadLessonPlans } from '~/db/LessonPlanModel'
import { loadLessonPaths } from '~/db/LessonPathModel'

const { courseKey } = useRoute().params
const workshop = useWorkshopStore()
const lessonPaths = ref([])

const uiState = reactive({
  editCourse: false,
})

// make sure requested course is active
// if (!workshop.isCourseActive || workshop.activeCourse.publicKey !== courseKey) {
//   const cachedCourse = workshop.getCourse(courseKey)

//   // load and cache if necessary
//   if (!cachedCourse) {
//     const { data: course, error } = await useAsyncData(
//       `course-${courseKey}`,
//       () => loadCourse(courseKey)
//     )
//     workshop.cacheCourse(course.value)
//   }
//   workshop.makeCourseActive(courseKey)
// }

const loadData = async () => {
  const { data: courseData, error } = await useAsyncData(
    `course-${courseKey}`,
    async () => {
      const [course, lessonPlans, paths] = await Promise.all([
        loadCourse(courseKey),
        loadLessonPlans(courseKey),
        loadLessonPaths(courseKey),
      ])
      console.log('returning course and lesson plans')

      return { course, lessonPlans, paths }
    }
  )
  console.log('using course and lesson plans', courseData.value)
  const { course, lessonPlans, paths } = courseData.value
  workshop.cacheCourse(course)
  workshop.makeCourseActive(course.publicKey)
  workshop.cacheLessons(lessonPlans)
  lessonPaths.value = paths
}
loadData()

const onGoToCourseList = () => {
  workshop.deactivateCourse()
  navigateTo('/workshop/courses')
}

const onOpenLesson = (lessonKey) =>
  navigateTo(`/workshop/course-${courseKey}/lesson-${lessonKey}`)

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
</script>

<style scoped></style>
