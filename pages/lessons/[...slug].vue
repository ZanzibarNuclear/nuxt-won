<template>
  <div v-if="post">
    <ContentRenderer :value="post" class="prose prose-stone dark:prose-invert p-3 mx-auto" />
  </div>

  <div v-if="surroundings">
    <NextPreviousLesson :previous-lesson-link="previousLesson" :next-lesson-link="nextLesson" />
  </div>

</template>

<script lang="ts" setup>
const route = useRoute()
definePageMeta({
  layout: 'lesson-layout',
})

const { data: post } = await useAsyncData('lessons', () => {
  return queryCollection('lessons').path(route.path).first()
})

const { data: surroundings } = await useAsyncData('surround', () => {
  return queryCollectionItemSurroundings('lessons', route.path, {
    before: 1,
    after: 1,
    fields: ['title']
  })
    .where('published', '=', true)  // FIXME:
    .order('date', 'DESC')
})

const previousLesson = computed(() => {
  return surroundings.value?.[0]
})
const nextLesson = computed(() => {
  return surroundings.value?.[1]
})

onMounted(() => {
  console.log(surroundings.value)
})
</script>

<style scoped>
main {
  border: 1px solid white;
}

h1 {
  text-align: center;
}

.lesson-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.previous-lesson,
.next-lesson {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
}

.no-previous-lesson,
.no-next-lesson {
  font-size: 1.5rem;
}
</style>
