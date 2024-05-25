<template>
  <div>
    <div class="text-sm">You are already getting smarter.</div>
    <div>
      <NuxtLink :to="`/learning/course-${learning.activeCourse?.publicKey}`"
        >Return to list of lessons for course</NuxtLink
      >
    </div>
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
import type { ContentPart } from '~/types/won-types'

const learning = useLearningStore()
const route = useRoute()
const lessonKey = route.params.key

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

onMounted(async () => {
  // see if lesson is cached
  if (!learning.useLesson(lessonKey)) {
    // not cached, so fetch it, cache it, and make it active
    const plan = await loadLessonPlan(lessonKey)
    learning.cacheLesson(plan)
    learning.useLesson(lessonKey)
  }

  // load lesson and content parts
  const contents: ContentPart[] = await loadContentParts(lessonKey)
  if (contents) {
    learning.cacheContents(contents)
  }
})
</script>

<style scoped></style>
