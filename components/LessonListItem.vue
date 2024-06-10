<template>
  <div class="item-container">
    <h3>{{ lessonPlan.title }}</h3>
    <img v-if="lessonPlan.coverArt" :src="lessonPlan.coverArt" width="250px" />
    <div class="rich-text"><span v-html="lessonPlan.description" /></div>
  </div>
</template>

<script setup lang="ts">
defineProps(['lessonPlan'])
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
