<template>
  <div>
    <icon name="icon" />
    <span class="text-2xl grow">{{ title }}</span>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: String,
  title: String,
})
</script>

<style scoped></style>
