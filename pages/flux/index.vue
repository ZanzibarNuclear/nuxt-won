<template>
  <div>
    <h1>Flux</h1>
    <div class="my-4">
      <NuxtImg src="/images/flux-theme-v1.jpg" alt="Flux Theme" />
    </div>
    <div>
      Flux is all about sharing your thoughts and discovering what others are thinking. This is meant to be a safe place
      to discuss nuclear energy.
    </div>

    <h2>Under Construction</h2>
    <div class="my-4">
      This feature is under construction. Try it out, and let us know what you think.
    </div>

    <h2>Try Flux</h2>
    <div class="my-4">
      <NuxtLink to="https://flux.worldofnuclear.com">Try Flux.</NuxtLink> See if you can start a chain reaction.
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'World of Nuclear - Flux',
  ogTitle: 'World of Nuclear - Flux',
  description:
    'Social media for ideas about nuclear energy. Share thoughts as they come to you. Start a chain reaction.',
  ogDescription:
    'Social media for ideas about nuclear energy. Share thoughts as they come to you. Start a chain reaction.',
  ogImage: 'https://worldofnuclear.com/flux-theme-v1.jpg',
  twitterCard: 'summary',
})
</script>
