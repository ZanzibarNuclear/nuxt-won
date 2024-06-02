<template>
  <UContainer>
    <h1 class="text-center">Explore the world of nuclear energy.</h1>
    <div class="feature-layout">
      <feature-tile
        v-for="feature in features"
        :id="feature.name"
        :feature="feature"
      />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'World of Nuclear',
  ogTitle: 'World of Nuclear',
  description:
    "Zanzibar's World of Nuclear is a safe place to explore the beneficial uses of nuclear energy. Consume our bite-sized lessons, join in interactive discussions, and operate nuclear simulations. Find out about unlimited power.",
  ogDescription:
    "Zanzibar's World of Nuclear is a safe place to explore the beneficial uses of nuclear energy. Consume our bite-sized lessons, join in interactive discussions, and operate nuclear simulations. Find out about unlimited power.",
})

const features = [
  {
    category: 'forum',
    name: 'What Say You?',
    coverImage: '/images/speech-bubbles.png',
    description:
      'Long-form discussions for sharing ideas about nuclear energy.',
    callToAction: 'Join the Discussion',
    routeName: 'features-what-say-you',
  },
  {
    category: 'learning',
    name: 'Mini Lessons',
    coverImage: '/images/atomic-symbol.jpg',
    description:
      'Learn everything you need to know to understand how nuclear energy can be put to good use.',
    callToAction: 'Get Smarter Every Day',
    routeName: 'features-daily-lessons',
  },
  {
    category: 'learning',
    name: 'Simulators',
    coverImage: '/images/Cherenkov-radiation.jpg',
    description: 'Try nuclear simulators - fun and educational.',
    callToAction: 'Learn By Doing',
    routeName: 'features-simulators',
  },
]
</script>

<style>
.feature-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
}
.rich-text :deep(p) {
  margin: 0.75rem 0;
}
.rich-text :deep(ul) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: disc;
  list-style-position: inside;
}
</style>
