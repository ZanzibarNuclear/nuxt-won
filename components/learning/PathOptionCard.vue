<template>
  <div class="bg-white p-2">
    <div class="font-bold">{{ path.name }}</div>
    <div class="mb-2">{{ path.description }}</div>
    <UButton @click="() => emit('startLesson', path)"
      >Start <UIcon name="i-ph-arrow-right-duotone"
    /></UButton>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['path'])
const emit = defineEmits(['startLesson'])
</script>

<style scoped></style>
