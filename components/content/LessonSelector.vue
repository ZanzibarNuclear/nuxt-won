<template>
  <ClientOnly>
    <div v-if="lessons">
      <div v-for="lesson in lessons" :key="lesson.id">
        <NuxtLink :to="lesson.path">
          {{ lesson.title }}
        </NuxtLink>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
const lessons = ref()
const load = async () => {
  const { data } = await useAsyncData('benefits', () => {
    return queryCollection('lessons').all()
  })
  lessons.value = data.value
  lessons.value.forEach((lesson) => {
    console.log(lesson)
  })
}
await load()
</script>

<style></style>
