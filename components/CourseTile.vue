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
        <span v-html="description" />
      </div>
    </div>
    <template #footer>
      <div class="actions">
        <UButton
          block
          color="primary"
          variant="outline"
          label="Open this course"
          @click="() => navigateTo(`/learning/courses/${publicKey}`)"
        />
      </div>
    </template>
  </UCard>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps(['course'])
const router = useRouter()

const { publicKey, title, description, coverArt } = props.course

const goTo = () => {
  router.push(`/learning/courses/${publicKey}`)
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
  margin: 0.75rem 0;
}
.rich-text :deep(ul) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: disc;
  list-style-position: inside;
}
</style>
