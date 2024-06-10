<template>
  <div>
    <UBreadcrumb :links="learningLinks" />
    <h1>{{ activeLesson.title }}</h1>
    <LessonContentView :content-parts="learning.contentParts" />
    <UButton @click="awardCredit">Give me credit</UButton>
  </div>
  <UModal v-model="showCreditMessage">
    <div class="p-6">
      <h2>Congratulations!!</h2>
      <div>Congratulations on completing this lesson. Well done.</div>
      <div>
        Anytime you want to refresh your memory, you are welcome to retake the
        lesson.
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { loadContentParts } from '~/db/ContentPartModel'
import { loadLessonPlan } from '~/db/LessonPlanModel'

const learningLinks = computed(() => {
  return [
    {
      label: 'Courses',
      icon: 'i-ph-house-line',
      to: '/learning',
    },
    {
      label: 'Course Overview',
      icon: 'i-ph-list-checks',
      to: '/learning/courses/' + courseKey,
    },
    {
      label: 'Lesson',
      icon: 'i-ph-book',
    },
  ]
})

const learning = useLearningStore()
const route = useRoute()
const { lessonKey, courseKey } = route.params

const activeLesson = computed(() => {
  if (learning.activeLesson) {
    return learning.activeLesson
  } else {
    return {
      title: 'This fabulous lesson is loading...how exciting...',
    }
  }
})

const showCreditMessage = ref(false)
const awardCredit = () => {
  showCreditMessage.value = true
}

async function loadData() {
  const { data: lessonData, pending } = await useAsyncData(
    `lesson-data-${lessonKey}`,
    async () => {
      const [plan, contents] = await Promise.all([
        loadLessonPlan(lessonKey),
        loadContentParts(lessonKey),
      ])
      return { plan, contents }
    }
  )
  learning.cacheLesson(lessonData.value.plan)
  learning.useLesson(lessonKey)
  learning.cacheContents(lessonData.value.contents)
}
loadData()
</script>

<style scoped></style>
