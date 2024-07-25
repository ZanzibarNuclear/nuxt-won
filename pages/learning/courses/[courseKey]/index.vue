<template>
  <div>
    <UBreadcrumb :links="breadcrumbLinks" />
    <h1>{{ activeCourse.title }}</h1>
    <div><span class="rich-text" v-html="activeCourse.description" /></div>
    <h3>What You Will Learn</h3>
    <div class="my-2 rich-text">
      <span v-html="activeCourse.syllabus" />
    </div>
  </div>
  <div
    class="text-center w-3/4 mx-auto text-[#222222] dark:text-[#ffa] bg-[#f5f5f5] dark:bg-[#333] rounded-md p-4 mb-12"
  >
    <div v-if="isReady">
      <h3>Pick a path to start learning</h3>
      <div v-if="learning.activeLessonPaths.length === 1">
        <learning-path-option-card
          :path="learning.activeLessonPaths[0]"
          @start-lesson="onStartLesson"
        />
      </div>
      <div v-else class="grid grid-cols-2 gap-y-4 gap-x-4">
        <div v-for="path in learning.activeLessonPaths">
          <learning-path-option-card
            :path="path"
            @start-lesson="onStartLesson"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <h3>Nowhere to Go</h3>
      <div>Sorry, it appears that this course is not ready.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadCourse } from '~/db/CourseModel'
import { loadLessonPlans } from '~/db/LessonPlanModel'
import { loadLessonPaths } from '~/db/LessonPathModel'
import { logLearningEvent } from '~/db/EventModel'

const breadcrumbLinks = [
  {
    label: 'Courses',
    icon: 'i-ph-house-line',
    to: '/learning',
  },
  {
    label: 'Course Overview',
    icon: 'i-ph-list-checks',
  },
]

const learning = useLearningStore()

const route = useRoute()
const courseKey = route.params.courseKey

const isReady = computed(() => learning.activeLessonPaths.length > 0)
const activeCourse = computed(() => {
  if (learning.activeCourse) {
    return learning.activeCourse
  } else {
    return {
      title: 'This may be the course you are looking for...loading...',
    }
  }
})

async function loadData() {
  const { data: courseData } = await useAsyncData(
    `course-${courseKey}`,
    async () => {
      const [course, lessonPlans, paths] = await Promise.all([
        loadCourse(courseKey as string),
        loadLessonPlans(courseKey as string),
        loadLessonPaths(courseKey as string),
      ])
      return { course, lessonPlans, paths }
    }
  )
  learning.cacheCourse(courseData.value?.course)
  learning.useCourse(courseKey)
  learning.cacheLessons(courseData.value?.lessonPlans)
  learning.cacheLessonPaths(courseData.value?.paths)
}
await loadData()

const onStartLesson = (path) => {
  logLearningEvent(courseKey, path.publicKey, path.trailhead, 'choose-path')
  learning.choosePath(path.publicKey)
  navigateTo('/learning/courses/' + courseKey + '/lessons/' + path.trailhead)
}
</script>

<style scoped>
.rich-text :deep(p) {
  margin-bottom: 0.5rem;
}
.rich-text :deep(ul) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: disc;
  list-style-position: inside;
}
.rich-text :deep(ol) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: decimal;
  list-style-position: inside;
}
.rich-text :deep(blockquote) {
  margin-left: 1rem;
  border-left: 2px solid goldenrod;
  padding-left: 1rem;
}
</style>
