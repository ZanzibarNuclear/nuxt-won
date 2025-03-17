<template>
  <div>
    <h1 class="text-center">Flux Gallery</h1>
    <UCarousel
      v-slot="{ item }"
      :items="artwork"
      :auto-height="true"
      :autoplay="{ delay: 3000 }"
      class="mx-auto max-w-sm"
    >
      <NuxtPicture
        @click="advanceSlide()"
        :src="`/images/art/${item}`"
        sizes="100vw sm:50vw md:600px"
      />
    </UCarousel>
    <div class="text-right mt-2">
      <UButton variant="ghost" alt="Go to the lobby" :to="{ name: 'lobby' }">
        Enter the lobby
        <UIcon name="i-ph-door-duotone" />
        <UIcon name="i-ph-arrow-right" />
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'entrance',
})
useSeoMeta({
  title: 'Flux Gallery - World of Nuclear',
  ogTitle: 'Flux Gallery - World of Nuclear',
  description: 'Imagine the beauty of nuclear flux powering the universe',
  ogDescription: 'Imagine the beauty of nuclear flux powering the universe',
  ogImage: 'https://worldofnuclear/images/blue-reactor.jpg',
})
const artwork = [
  'flux-hex-sphere.webp',
  'flux-radar.webp',
  'flux-blossom.webp',
  'flux-ocean.webp',
  'flux-under-water.webp',
  'flux-galaxy.webp',
  'flux-spiral.webp',
]
const showing = ref(0)
const onDisplay = computed(() => {
  return '/images/art/' + artwork[showing.value]
})

const advanceSlide = () => {
  showing.value = (showing.value + 1) % artwork.length
}
</script>

<style></style>
