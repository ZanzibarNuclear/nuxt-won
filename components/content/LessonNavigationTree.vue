<template>
  <h3>Lesson Navigation Tree</h3>
  <ul>
    <li v-for="lesson in navData" :key="lesson.id">
      {{ lesson.title }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
const { data: navData } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('lessons')
    .where('published', '=', true)
    .order('date', 'DESC')
})
</script>

<style></style>