<template>
  <ClientOnly>
    <div class="lesson-selector-container">
      <h3>Lesson Selector</h3>
      <div class="selector-row">
        <USelect v-model="selectedLesson" :options="lessonOptions" class="lesson-select" />
        <UButton @click="goToLesson">Go to Lesson</UButton>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
const selectedLesson = ref()

const { data: lessons } = await useAsyncData('benefits', () => {
  return queryCollection('lessons')
    .where('published', '=', true)
    .order('date', 'ASC')
    .all()
})
const lessonOptions = computed(() => {
  return lessons.value?.map((lesson) => {
    return {
      label: lesson.title,
      value: lesson.id
    }
  })
})

const goToLesson = () => {
  const targetLesson = lessons.value?.find((lesson) => lesson.id === selectedLesson.value)
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

.lesson-select {
  flex: 1;
}
</style>
