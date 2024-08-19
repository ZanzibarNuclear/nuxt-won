<template>
  <UContainer>
    <div class="feature-layout">
      <feature-tile v-for="feature in features" :id="feature.name" :feature="feature" />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
// definePageMeta({
//   layout: 'home-layout',
// })
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
    routeName: 'wsy',
  },
  {
    category: 'learning',
    name: 'Mini Lessons',
    coverImage: '/images/simple-atom.svg',
    description:
      'Learn everything you need to know to understand how nuclear energy can be put to good use.',
    callToAction: 'Get Smarter Every Day',
    routeName: 'learning',
  },
  {
    category: 'games',
    name: 'Fun & Games',
    coverImage: '/images/word-search.jpg',
    description: 'Games with a nuclear theme.',
    callToAction: "Let's Play",
    routeName: 'games',
  },
  {
    category: 'hands-on',
    name: 'Simulators',
    coverImage: '/images/Cherenkov-radiation.jpg',
    description: 'Try nuclear simulators - fun and educational.',
    callToAction: 'Learn By Experiment',
    routeName: 'simulators',
  },
]
</script>

<style>
.feature-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
}

.feature-card-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}

.rich-text :deep(p) {
  margin-bottom: 0.5rem;
}

.rich-text :deep(ul) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: disc;
  list-style-position: inside;
}

.rich-text :deep(ol) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: decimal;
  list-style-position: inside;
}

.rich-text :deep(blockquote) {
  margin-left: 1rem;
  border-left: 2px solid goldenrod;
  padding-left: 1rem;
}
</style>
