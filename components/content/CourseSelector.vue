<template>
  <ClientOnly>
    <h3>Course Selector</h3>
    <div v-if="courses">
      <div v-for="lesson in courses" :key="lesson.id">
        <NuxtLink :to="lesson.path">
          {{ lesson.title }}
        </NuxtLink>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
const courses = ref()
const load = async () => {
  const { data } = await useAsyncData('benefits', () => {
    // return queryCollection('lessons').where('id', 'LIKE', '/lessons/%/index.md').all()
    return queryCollection('courses').all()
  })
  courses.value = data.value
  courses.value.forEach((course: any) => {
    console.log(course)
  })
}
await load()
</script>

<style></style>
