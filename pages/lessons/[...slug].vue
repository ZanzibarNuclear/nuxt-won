<template>
  <div v-if="post">
    <ContentRenderer :value="post" class="prose prose-stone dark:prose-invert p-3 mx-auto" />
  </div>

  <LessonPathSigns />

</template>

<script lang="ts" setup>
const route = useRoute()
definePageMeta({
  layout: 'lesson-layout',
})

const { data: post } = await useAsyncData('lessons', () => {
  return queryCollection('lessons').path(route.path).first()
})

onMounted(() => {
  useLessons().setCurrentLesson(post.value?.stem as string)
})
</script>

<style scoped></style>
