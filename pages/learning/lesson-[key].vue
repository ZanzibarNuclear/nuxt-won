<template>
  <div>
    <h1>Check out this lesson!</h1>
    <h2>You are already getting smarter.</h2>
    <div>Lesson {{ lessonKey }} goes here</div>
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
import type { ContentPart } from '~/types/won-types'

const learning = useLearningStore()
const route = useRoute()
const lessonKey = route.params.key
const showCreditMessage = ref(false)
const awardCredit = () => {
  showCreditMessage.value = true
}

onMounted(async () => {
  // load lesson and content parts
  const contents: ContentPart[] = await loadContentParts(lessonKey)
  console.log('found contents: ', contents)

  if (contents) {
    learning.cacheContents(contents)
  }
})
</script>

<style scoped></style>
