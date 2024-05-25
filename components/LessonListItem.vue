<template>
  <div class="item-container" @click="() => openLesson(lessonPlan.publicKey)">
    <div class="text-xl">{{ lessonPlan.title }}</div>
    <div><span v-html="lessonPlan.description" /></div>
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
</style>
