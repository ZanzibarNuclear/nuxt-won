<template>
  <div v-if="post">
    <ContentRenderer :value="post" class="prose prose-stone dark:prose-invert p-3 mx-auto" />
  </div>

  <div class="lesson-navigation">
    <nuxt-link v-if="previousLesson" :to="previousLesson.path" class="previous-lesson">
      &larr; Previous Lesson
    </nuxt-link>
    <span v-else class="no-previous-lesson">
      🌟
    </span>

    <nuxt-link v-if="nextLesson" :to="nextLesson.path" class="next-lesson">
      Next Lesson &rarr;
    </nuxt-link>
    <span v-else class="no-next-lesson">
      🎉
    </span>
  </div>

</template>

<script lang="ts" setup>
const route = useRoute()
const { data: post } = await useAsyncData('lessons', () => {
  return queryCollection('lessons').path(route.path).first()
})

const { data: surroundings } = await useAsyncData('surround', () => {
  return queryCollectionItemSurroundings('lessons', route.path)
    // .where('published', '=', true)
    .order('date', 'DESC')
})

const previousLesson = computed(() => {
  return surroundings.value?.[0]
})

const nextLesson = computed(() => {
  return surroundings.value?.[1]
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
