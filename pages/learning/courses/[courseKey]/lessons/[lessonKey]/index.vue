<template>
  <div>
    <UBreadcrumb :links="breadcrumbLinks" />
    <h1>{{ activeLesson.title }}</h1>
    <LessonContentView :content-parts="learning.contentParts" class="mb-12" />
    <div class="prompt-box">
      <div v-if="nextStep" class="mx-auto">
        <div class="mb-4">
          {{ nextStep.teaser }}
        </div>
        <div>
          <UButton @click="onGoNext"
            >Continue <UIcon name="i-ph-arrow-right-duotone"
          /></UButton>
        </div>
      </div>
      <div v-else>
        <div class="font-bold text-xl">The End</div>
        <div>You seem to have reached the end of the course.</div>
        <div v-if="!gotCreditForFinishing">
          Click to <UButton @click="onClaimCredit">claim credit</UButton> for
          finishing.
        </div>
        <div>Want to <NuxtLink to="/learning">try another?</NuxtLink></div>
      </div>
    </div>
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
import { logLearningEvent } from '~/db/EventModel'
import { loadLessonPlan } from '~/db/LessonPlanModel'

const breadcrumbLinks = computed(() => {
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
const nextStep = ref()

const activeLesson = computed(() => {
  if (learning.activeLesson) {
    return learning.activeLesson
  } else {
    return {
      title: 'This fabulous lesson is loading...how exciting...',
    }
  }
})

const gotCreditForFinishing = ref(false)
const showCreditMessage = ref(false)
const onClaimCredit = () => {
  gotCreditForFinishing.value = true
  logLearningEvent(courseKey, learning.activePath?.publicKey, null, 'finished')
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
  nextStep.value = learning.lookupStep(lessonKey)
}
loadData()

const onGoNext = () => {
  logLearningEvent(
    courseKey,
    learning.activePath?.publicKey,
    nextStep.value.to,
    'take-step'
  )
  navigateTo('/learning/courses/' + courseKey + '/lessons/' + nextStep.value.to)
}
</script>
