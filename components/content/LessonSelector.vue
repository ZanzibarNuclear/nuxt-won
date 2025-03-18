<template>
  <div class="lesson-selector-container">
    <h3 class="text-2xl font-bold text-center mb-2">Pick a Lesson</h3>
    <div class="selector-row">
      <UButton to="/lessons" icon="i-ph-book-open-text-duotone">All Lessons</UButton>
      <USelect
        v-model="selectedLesson"
        :items="lessonOptions"
        arrow
        @update:model-value="goToLesson"
        class="w-96 dark:bg-cooling-tower dark:text-white"
        color="primary"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const selectedLesson = ref()

// Use sorted lessons from lesson store
const lessons = useLessonStore().courseIndex.orderedLessons

const lessonOptions = computed(() => {
  return lessons.map((lesson) => {
    return {
      label: lesson.title,
      value: lesson.stem,
    }
  })
})

const goToLesson = () => {
  const targetLesson = lessons.find((lesson) => lesson.stem === selectedLesson.value)
  navigateTo(targetLesson?.path)
}
</script>

<style scoped>
.lesson-selector-container {
  width: 70%;
  margin: 0 auto;
}

.selector-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
