<template>
  <ClientOnly>
    <h3>Lesson Selector</h3>
    <USelect v-model="selectedLesson" :options="lessonOptions" />
    <UButton @click="goToLesson">Go to Lesson</UButton>
  </ClientOnly>
</template>

<script lang="ts" setup>
const selectedLesson = ref()

const { data: lessons } = await useAsyncData('benefits', () => {
  return queryCollection('lessons').all()
})
const lessonOptions = computed(() => {
  return lessons.value?.map((lesson) => {
    return {
      label: lesson.title,
      value: lesson.id
    }
  })
})

// const updateSelectedLesson = (pick: object) => {
//   console.log('selected update: ' + JSON.stringify(pick))
//   selectedLesson.value = pick
// }
const goToLesson = () => {
  console.log('going to lesson: ' + selectedLesson.value.id)
  const lesson = lessons.value?.find((lesson) => lesson.id === selectedLesson.value)
  console.log(lesson)
  navigateTo(lesson?.path)
}
</script>

<style></style>
