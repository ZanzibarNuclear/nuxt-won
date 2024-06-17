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
      <UCard>
        <template #header>
          <h2>
            {{ workshop.activeCourse?.title }} (key:
            {{ workshop.activeCourse?.publicKey }})
          </h2>
          <div>{{ item.description }}</div>
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
          <LessonPathBuilder
            :lesson-paths="workshop.activeLessonPaths"
            :course-key="courseKey"
          />
        </div>
        <template #footer>
          <div>Have a nice day!</div>
          <div v-if="isPublished">
            Published at: {{ workshop.activeCourse?.publishedAt }}
            <UButton label="Withdraw" @click="onUnpublish(courseKey)" />
          </div>
          <div v-else>
            This course is an unpublished draft.
            <UButton label="Publish" @click="onPublish(courseKey)" />
          </div>
        </template>
      </UCard>
    </template>
  </UTabs>
</template>

<script setup lang="ts">
import { loadCourse, publishCourse, unpublishCourse } from '~/db/CourseModel'
import { loadLessonPlans } from '~/db/LessonPlanModel'
import { loadLessonPaths } from '~/db/LessonPathModel'

const { courseKey } = useRoute().params
const workshop = useWorkshopStore()

const loadData = async () => {
  const { data: courseData } = await useAsyncData(
    `course-${courseKey}`,
    async () => {
      const [course, lessonPlans, paths] = await Promise.all([
        loadCourse(courseKey),
        loadLessonPlans(courseKey),
        loadLessonPaths(courseKey),
      ])
      return { course, lessonPlans, paths }
    }
  )
  console.log('using course and lesson plans', courseData.value)
  const { course, lessonPlans, paths } = courseData.value
  workshop.cacheCourse(course)
  workshop.makeCourseActive(course.publicKey)
  workshop.cacheLessons(lessonPlans)
  workshop.cacheCoursePaths(course.publicKey, paths)
}
await loadData()

const isPublished = computed(() => {
  return workshop.activeCourse?.publishedAt
})
const onGoToCourseList = () => {
  workshop.deactivateCourse()
  navigateTo('/workshop/courses')
}

const onOpenLesson = (lessonKey) =>
  navigateTo(`/workshop/courses/${courseKey}/lessons/${lessonKey}`)
// navigateTo(`/workshop/course-${courseKey}/lesson-${lessonKey}`)

const onPublish = async (courseKey) => {
  const delta = await publishCourse(courseKey)
  if (delta) {
    console.log('caching published course', delta)
    workshop.cacheCourse(delta)
  }
}
const onUnpublish = async (courseKey) => {
  const delta = await unpublishCourse(courseKey)
  if (delta) {
    console.log('caching unpublished course', delta)
    workshop.cacheCourse(delta)
  }
}

const items = [
  {
    key: 'overview',
    label: 'Overview',
    description: 'Information about the course.',
  },
  {
    key: 'lessons',
    label: 'Lessons',
    description: 'Add a new lesson or select one to work on.',
  },
  {
    key: 'paths',
    label: 'Paths',
    description: 'Sequences of lessons through the course.',
  },
]
</script>

<style scoped></style>
