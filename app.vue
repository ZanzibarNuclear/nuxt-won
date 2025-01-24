<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  link: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
      rel: 'stylesheet',
    },
  ],
})
</script>

<style>
body {
  @apply bg-heroic-uranium dark:bg-heroic-graphite text-heroic-graphite dark:text-heroic-lightgray;
}
</style>
