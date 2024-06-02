<template>
  <UCard class="card">
    <template #header>
      <div class="flex">
        <NuxtImg :src="coverArt" class="cover-art" />
      </div>
    </template>
    <div>
      <div class="text-2xl mb-4">{{ title }}</div>
      <div class="my-2 rich-text">
        <span v-html="description" />
      </div>
    </div>
    <template #footer>
      <div class="actions">
        <UButton
          block
          color="primary"
          variant="outline"
          label="Take a closer look"
          :to="`/learning/course-${publicKey}`"
        />
      </div>
    </template>
  </UCard>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps(['course'])
const router = useRouter()

const { publicKey, title, description, coverArt, syllabus } = props.course

const goTo = () => {
  router.push(`/learning/course-${publicKey}`)
}
</script>

<style lang="scss" scoped>
.card {
  display: grid;
  grid-template-rows: max-content 200px 1fr;
}
.card img {
  max-height: 150px;
  margin: 0 auto;
}
.rich-text :deep(p) {
  margin: 0.75rem 0;
}
.rich-text :deep(ul) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: disc;
  list-style-position: inside;
}
</style>
