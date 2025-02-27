<template>
  <div class="lesson-navigation">
    <UButton v-if="hasPreviousLesson" variant="ghost" :to="previousLessonLink" :label="previousLabel">
      <template #leading>
        <UIcon name="i-ph-arrow-fat-line-left-duotone" />
      </template>
    </UButton>
    <UIcon v-else name="i-ph-play-duotone" />

    <UButton v-if="hasNextLesson" variant="ghost" :to="nextLessonLink" :label="nextLabel">
      <template #trailing>
        <UIcon name="i-ph-arrow-fat-line-right-duotone" />
      </template>
    </UButton>
    <UIcon v-else name="i-ph-medal-duotone" />
  </div>
</template>

<script lang="ts" setup>
import { UButton } from '#components';
import { computed } from 'vue'

const props = defineProps<{
  previousLessonLink?: any
  nextLessonLink?: any
}>()

const hasPreviousLesson = computed(() => !!props.previousLessonLink)
const hasNextLesson = computed(() => !!props.nextLessonLink)
const previousLabel = computed(() => {
  return `${props.previousLessonLink?.title}` || '🌟'
})
const nextLabel = computed(() => {
  return `${props.nextLessonLink?.title}` || '🎉'
})

onMounted(() => {
  console.log(props.previousLessonLink)
  console.log(props.nextLessonLink)
})
</script>

<style scoped>
.lesson-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.no-previous-lesson,
.no-next-lesson {
  font-size: 1.5rem;
}
</style>