<template>
  <div>
    <NuxtLink :to="{ name: 'lobby-gallery' }">
      <UCard :ui="cardStyle" class="shadow-cherenkov">
        <h1
          class="dark:text-heroic-cherenkov font-semibold sm:text-5xl text-4xl text-heroic-cherenkov text-center"
        >
          Blue is the new green.
        </h1>
      </UCard>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { EventRepository as eventRepo } from '~/api/wonService/EventRepo'
const cardStyle = {
  background: 'bg-heroic-graphite',
}
onMounted(() => {
  eventRepo.logPageHit('opener')
})
</script>

<style scoped></style>
