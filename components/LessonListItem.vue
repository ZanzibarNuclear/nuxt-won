<template>
  <div class="item-container" @click="() => openLesson(lessonPlan.publicKey)">
    <div class="text-xl">{{ lessonPlan.title }}</div>
    <div class="rich-text"><span v-html="lessonPlan.description" /></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['lessonPlan'])
function openLesson(lessonKey: string) {
  navigateTo(`lesson-${lessonKey}`)
}
</script>

<style scoped>
.item-container {
  border: 1px lightblue solid;
  width: 100%;
  padding: 0.5rem;
}
.item-container:hover {
  border-color: blue;
  border-style: dashed;
}
.rich-text :deep(p) {
  margin: 0.75rem 0;
}
.rich-text :deep(ul) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: disc;
  list-style-position: inside;
}
</style>
