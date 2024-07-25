<template>
  <div class="item-container" :title="lessonPlan.publicKey">
    <div class="item-layout">
      <div class="item-label">Title:</div>
      <div>{{ lessonPlan.title }}</div>
      <div class="item-label">Published:</div>
      <div>
        {{
          lessonPlan.publishedAt
            ? displayAsDateTime(lessonPlan.publishedAt)
            : 'Draft'
        }}
      </div>
    </div>
    <!-- <div class="font-bold">
      {{ lessonPlan.title }} (key: {{ lessonPlan.publicKey }})
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { displayAsDateTime } from '#imports'
defineProps(['lessonPlan'])
</script>

<style scoped>
.item-layout {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
.item-label {
  font-weight: bold;
}
.item-container {
  border: 1px lightblue solid;
  width: 100%;
  padding: 0.5rem;
}
.item-container:hover {
  background-color: theme('colors.blue.200');
}
.rich-text :deep(p) {
  margin-bottom: 0.5rem;
}
.rich-text :deep(ul) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: disc;
  list-style-position: inside;
}
.rich-text :deep(ol) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: decimal;
  list-style-position: inside;
}
.rich-text :deep(blockquote) {
  margin-left: 1rem;
  border-left: 2px solid goldenrod;
  padding-left: 1rem;
}
</style>
