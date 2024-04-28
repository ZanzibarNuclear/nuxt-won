<template>
  <UContainer>
    <h1 class="text-center">Explore the world of nuclear energy.</h1>
    <div class="flex flex-wrap">
      <feature-tile
        class="w-72 mx-4 my-4"
        v-for="feature in features"
        :id="feature.name"
        :feature="feature"
      />
    </div>
  </UContainer>
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
    routeName: 'features-what-say-you',
  },
  {
    category: 'learning',
    name: 'Daily Lessons',
    coverImage: '/images/atomic-symbol.jpg',
    description:
      'Learn everything you need to know to understand how nuclear energy can be put to good use.',
    callToAction: 'Get Smarter',
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

<style scoped></style>
