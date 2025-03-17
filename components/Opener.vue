<template>
  <div>
    <NuxtLink :to="{ name: 'lobby-gallery' }">
      <UCard variant="subtle">
        <h1 class="font-semibold sm:text-5xl text-4xl text-center my-0">Blue is the new green.</h1>
      </UCard>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
h1 {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
