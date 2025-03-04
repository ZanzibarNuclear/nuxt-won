<template>
  <div class="frame">
    <NuxtImg class="mx-auto" :src="src" :alt="caption" :width="width" :height="height" />
    <div v-if="credit" class="text-center mt-2 text-sm text-heroic-cherenkov dark:text-heroic-cherenkov">Photo by:
      <NuxtLink v-if="creditUrl" :to="creditUrl" class="text-heroic-cherenkov">{{ credit }}</NuxtLink>
      <span v-else>{{ credit }}</span>
    </div>
    <div v-if="caption" class="mt-6 text-center text-lg text-heroic-graphite dark:text-heroic-lightgray">
      {{ caption }}
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  src: string
  alt?: string
  width?: string
  height?: string
  caption?: string
  credit?: string
  creditUrl?: string
}>()
</script>

<style scoped>
.frame {
  @apply shadow-lg rounded-lg overflow-hidden mx-auto p-4 bg-stone-300 dark:bg-stone-600;
}
</style>