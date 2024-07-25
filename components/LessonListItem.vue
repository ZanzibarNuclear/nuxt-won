<template>
  <div class="item-container">
    <div class="font-bold">
      {{ lessonPlan.title }} (key: {{ lessonPlan.publicKey }})
    </div>
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
