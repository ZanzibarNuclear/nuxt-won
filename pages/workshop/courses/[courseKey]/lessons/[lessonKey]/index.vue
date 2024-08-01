<template>
  <h1>
    <UButton icon="i-ph-arrow-up-left" class="mr-2" @click="onGoToCourse" />
    Lesson Builder
  </h1>
  <UTabs :items="items" class="w-full">
    <template #item="{ item }">
      <UCard>
        <template #header>
          <h2>{{ workshop.activeLesson?.title }}</h2>
          {{ item.description }}
        </template>

        <div v-if="item.key === 'overview'" class="space-y-3">
          <LessonOverviewBuilder
            :course="workshop.activeCourse"
            :lesson="workshop.activeLesson"
          />
        </div>
        <div v-else-if="item.key === 'content'" class="space-y-3">
          <LessonContentBuilder :lesson-key="lessonKey" />
        </div>
        <div v-if="item.key === 'sequence'" class="space-y-3">
          <Sequencerator
            :items-to-sequence="workshop.sortedContents"
            @save-sequence="handleSaveSortOrder"
          />
        </div>

        <template #footer>
          <div>Have a splendid life!</div>
          <div v-if="isPublished">
            Published at: {{ workshop.activeCourse?.publishedAt }}
            <UButton
              label="Withdraw"
              @click="onUnpublish(lessonKey as string)"
            />
          </div>
          <div v-else>
            This course is an unpublished draft.
            <UButton label="Publish" @click="onPublish(lessonKey as string)" />
          </div>
        </template>
      </UCard>
    </template>
  </UTabs>
</template>

<script setup lang="ts">
import { loadCourse } from '~/db/CourseModel'
import {
  loadLessonPlan,
  publishLesson,
  unpublishLesson,
} from '~/db/LessonPlanModel'
import { changeSequence } from '~/db/ContentPartModel'
import { loadContentParts } from '~/db/ContentPartModel'

definePageMeta({
  colorMode: 'light'
})

const { courseKey, lessonKey } = useRoute().params
const workshop = useWorkshopStore()

const isPublished = computed(() => {
  return workshop.activeLesson?.publishedAt
})

const onGoToCourse = () => {
  navigateTo(`/workshop/courses/${courseKey}`)
}
const handleSaveSortOrder = async (delta) => {
  const results = await changeSequence(delta)
  workshop.cacheLessonContent(results)
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
    description: 'Assemble content for the lesson.',
  },
  {
    key: 'sequence',
    label: 'Content Sequence',
    description: 'Change the sequencing of content parts.',
  },
]

async function loadData() {
  const start = new Date().getMilliseconds()
  const { data: courseData, error } = await useAsyncData(
    `course-${courseKey}`,
    async () => {
      const [course, lessonPlan, content] = await Promise.all([
        loadCourse(courseKey),
        loadLessonPlan(lessonKey),
        loadContentParts(lessonKey),
      ])
      return { course, lessonPlan, content }
    }
  )
  const { course, lessonPlan, content } = courseData.value
  workshop.cacheCourse(course)
  workshop.makeCourseActive(courseKey as string)
  workshop.cacheLesson(lessonPlan)
  workshop.makeLessonActive(lessonKey as string)
  workshop.clearContents()
  workshop.cacheLessonContent(content)
  const end = new Date().getMilliseconds()
  console.log('elapse time to load lesson data: %dms', end - start)
}
await loadData()

const onPublish = async (lessonKey: string) => {
  const delta = await publishLesson(lessonKey)
  if (delta) {
    console.log('caching published course', delta)
    workshop.cacheLesson(delta)
  }
}
const onUnpublish = async (lessonKey: string) => {
  const delta = await unpublishLesson(lessonKey)
  if (delta) {
    console.log('caching unpublished course', delta)
    workshop.cacheLesson(delta)
  }
}
</script>

<style scoped></style>
