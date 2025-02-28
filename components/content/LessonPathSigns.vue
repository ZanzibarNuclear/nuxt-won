<template>
  <div class="lesson-navigation">
    <UButton v-if="hasPrevious" variant="ghost" :to="previous.path" :label="previous.title">
      <template #leading>
        <UIcon name="i-ph-arrow-fat-line-left-duotone" />
      </template>
    </UButton>
    <UIcon v-else name="i-ph-play-duotone" />

    <UButton v-if="hasNext" variant="ghost" :to="next.path" :label="next.title">
      <template #trailing>
        <UIcon name="i-ph-arrow-fat-line-right-duotone" />
      </template>
    </UButton>
    <UIcon v-else name="i-ph-medal-duotone" />
  </div>
</template>

<script lang="ts" setup>
const lessonController = useLessons()

const hasPrevious = computed(() => lessonController.hasPreviousLesson.value)
const previous = computed(() => lessonController.previousLesson.value)
const hasNext = computed(() => lessonController.hasNextLesson.value)
const next = computed(() => lessonController.nextLesson.value)
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