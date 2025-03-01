<template>
  <div>
    <UBreadcrumb :links="breadcrumbLinks" />
    <h1>{{ activeLesson.title }}</h1>
    <h2 v-if="!activeLesson.publishedAt" class="wip-notice">
      Under Construction: This lesson is a work in progress.
    </h2>
    <LessonContentView :content-parts="learning.contentParts" class="mb-12" />
    <div
      class="text-center w-3/4 mx-auto text-[#222222] dark:text-[#ffa] bg-[#f5f5f5] dark:bg-[#333] rounded-md p-4 mb-12">
      <div v-if="nextStep" class="mx-auto">
        <div class="mb-4">
          {{ nextStep.teaser }}
        </div>
        <div>
          <UButton @click="onGoNext">Continue
            <UIcon name="i-ph-arrow-right-duotone" />
          </UButton>
        </div>
      </div>
      <div v-else>
        <div class="font-bold text-xl mb-4">The End</div>
        <div>You seem to have reached the end of the course.</div>
        <div v-if="!gotCreditForFinishing">
          Click to <UButton @click="onClaimCredit">claim credit</UButton> for finishing.
        </div>
        <div>Want to <NuxtLink to="/learning">try another?</NuxtLink>
        </div>
      </div>
    </div>
  </div>
  <UModal v-model="showCreditMessage">
    <div class="p-6">
      <h2>Congratulations!!</h2>
      <div>Congratulations on completing this lesson. Well done.</div>
      <div>Anytime you want to refresh your memory, you are welcome to retake the lesson.</div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { LearningRepository as learningRepo } from '~/api/wonService/LearningRepo'
import { EventRepository as eventRepo } from '~/api/wonService/EventRepo'

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
      label: activeLesson.value.title || 'Lesson',
      icon: 'i-ph-book-open',
    },
  ]
})

const learning = useLearningStore()
const userContext = useUserStore()

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
  eventRepo.logLearningEvent(
    courseKey as string,
    learning.activePath?.publicKey as string,
    null,
    'finished',
  )
  showCreditMessage.value = true
}

async function loadData() {
  userContext.user
  const path = learning.activePath

  const { data: lessonData } = await useAsyncData(`lesson-data-${lessonKey}`, async () => {
    const [plan, contents] = await Promise.all([
      learningRepo.getLessonPlan(lessonKey),
      learningRepo.getContents(lessonKey),
    ])
    return { plan, contents }
  })
  const { plan, contents } = lessonData.value
  learning.cacheLesson(plan)
  learning.useLesson(lessonKey as string)
  learning.cacheContents(contents)
  nextStep.value = learning.lookupStep(lessonKey as string)
}
await loadData()

const onGoNext = () => {
  eventRepo.logLearningEvent(
    courseKey as string,
    learning.activePath?.publicKey as string,
    nextStep.value.to,
    'take-step',
  )
  navigateTo('/learning/courses/' + courseKey + '/lessons/' + nextStep.value.to)
}
</script>
<style lang="scss" scoped>
.wip-notice {
  color: #cc3300;
  text-align: center;
}
</style>
