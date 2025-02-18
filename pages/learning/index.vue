<template>
  <div>
    <h1>Topics of Interest</h1>
    <simple-toolbar v-if="isSignedIn">
      <UButton class="mr-2" label="Give Feedback" @click="onShowFeedbackForm" />
    </simple-toolbar>
    <div class="mx-auto">
      <div class="course-layout">
        <CourseTile
          v-for="course in learning.publishedCourses"
          class="mx-2 my-4"
          :course="course"
        />
      </div>
    </div>
  </div>
  <UModal v-model="showFeedbackForm">
    <feedback-form context="learning" @feedback-delivered="handleFeedbackDelivered" />
  </UModal>
</template>

<script setup lang="ts">
import { LearningRepository as learningRepo } from '~/api/wonService/LearningRepo'
import type { Course } from '~/types/won-types'

const breadcrumbLinks = [
  {
    label: 'Courses',
    icon: 'i-ph-house-line',
  },
]

const learning = useLearningStore()
const userContext = useUserStore()

const isSignedIn = computed(() => {
  return !!userContext.user
})

const showFeedbackForm = ref(false)
const onShowFeedbackForm = () => {
  showFeedbackForm.value = true
}
const handleFeedbackDelivered = () => {
  showFeedbackForm.value = false
  alert('Thanks for the feedback! We appreciate the chance to improve.')
}

async function loadData() {
  const { data, error } = await useAsyncData('learningCatalogAndContext', async () => {
    return await learningRepo.getCourses()
  })
  const { courses } = data.value
  if (courses) {
    courses.forEach((course: Course) => learning.cacheCourse(course))
  }
  if (error.value) {
    console.error('Something went wrong', error.value?.message)
  }
}
await loadData()
</script>

<style scoped>
.course-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
}
</style>
