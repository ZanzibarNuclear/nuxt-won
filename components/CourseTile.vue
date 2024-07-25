<template>
  <UCard class="card">
    <template #header>
      <div class="flex">
        <NuxtImg v-if="coverArt" :src="coverArt" class="cover-art" />
      </div>
    </template>
    <div>
      <div class="text-2xl mb-4">{{ title }}</div>
      <div class="my-2 rich-text overflow-y-auto h-48">
        <span v-html="blurb" />
      </div>
    </div>
    <template #footer>
      <div class="actions">
        <UButton
          block
          color="primary"
          variant="outline"
          label="Open this course"
          @click="goTo"
        />
      </div>
    </template>
  </UCard>
</template>

<script setup>
import { logLearningEvent } from '~/db/EventModel'

const props = defineProps(['course'])

const { publicKey, title, description, teaser, coverArt } = props.course

const blurb = computed(() => {
  return teaser || description
})
const goTo = () => {
  logLearningEvent(publicKey, null, null, 'open-course')
  navigateTo(`/learning/courses/${publicKey}`)
}
</script>

<style lang="scss" scoped>
.card {
  display: grid;
  grid-template-rows: max-content auto 1fr;
}
.card img {
  max-height: 150px;
  margin: 0 auto;
}
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
