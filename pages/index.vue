<template>
  <div class="text-center text-4xl mb-10">
    Explore the world of nuclear energy.
  </div>
  <div class="flex flex-wrap">
    <feature-tile
      class="w-72 mx-4 my-4"
      v-for="feature in features"
      :id="feature.name"
      :feature="feature"
    />
  </div>
</template>

<script setup>
const features = [
  {
    category: 'forum',
    name: 'What Say You',
    coverImage: '/images/speech-bubbles.png',
    description:
      'Long-form discussions for sharing ideas about nuclear energy.',
    callToAction: 'Share Ideas',
    routeName: 'what-say-you',
  },
  {
    category: 'learning',
    name: 'Daily Lessons',
    coverImage: '/images/atomic-symbol.jpg',
    description:
      'Learn everything you need to know to understand how nuclear energy can be put to good use.',
    callToAction: 'Get Smarter',
    routeName: 'daily-lessons',
  },
  {
    category: 'events',
    name: 'News',
    coverImage: '/images/Diablo-Canyon-power-plant.png',
    description:
      'Long-form discussions for sharing ideas about nuclear energy.',
    callToAction: 'Stay Current',
    routeName: 'nuclear-news',
  },
  {
    category: 'learning',
    name: 'Simulators',
    coverImage: '/images/Cherenkov-radiation.jpg',
    description: 'Try nuclear simulators - fun and educational.',
    callToAction: 'Learn By Doing',
    routeName: 'simulators',
  },
  {
    category: 'fun',
    name: 'Games',
    coverImage: '/images/word-search.jpg',
    description:
      'Long-form discussions for sharing ideas about nuclear energy.',
    callToAction: 'Play Now',
    routeName: 'fun-and-games',
  },
]
</script>

<style scoped></style>
