<template>
  <div>
    <h1>Flux</h1>
    <div class="my-4">Flux means something in a constant state of change or movement. In nuclear engineering, neutron
      flux is a measure of the rate of flow of neutrons in a reactor core. Both metaphors are useful. We can send out a
      flux of ideas, cause reactions, and experience changes in our thinking.</div>
    <div class="my-12">
      <NuxtImg src="/images/flux-theme-v1.jpg" alt="Flux Theme" class="mx-auto" />
      <div class="text-center text-sm">An idea of what Flux might look like</div>
    </div>
    <div class="my-4">In the World of Nuclear, Flux gives you the power to share ideas on any topic. As part of the
      World of Nuclear, the community may look for ways to relate your ideas to nuclear energy. It's all good as we build
      a cooperative community of learners.</div>
    <div class="mt-4 mb-8">
      This will give you an idea of what you can do with Flux.
    </div>
    <div class="my-4">
      <NuxtImg src="/images/Flux-sample-20241130.png" alt="Flux sample" class="w-3/4 mx-auto border-2 border-blue-300 p-3" />
      <div class="text-center text-sm">Spark a discussion with peers</div>
    </div>

    <h2 class="mt-8">Give Flux a Try</h2>
    <div class="my-4">
      <NuxtLink to="https://flux.worldofnuclear.com">
        <UIcon name="i-ph-lightning" />
        See if you can start a chain reaction.
      </NuxtLink>
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
