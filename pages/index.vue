<template>
  <UContainer>
    <h1 class="mb-12 text-center text-3xl font-bold">Welcome to Zanzibar's World of Nuclear Energy!</h1>

    <nuxt-img src="/images/Zanzibar-2024-07.jpg" width="250px" class="zanzi-photo" />

    <div class="mb-6">I am Zanzibar, your upbeat nuclear hero. I bring positive energy to the discussion about the
      productive uses of nuclear energy. The technology is ready for humanity to thrive.</div>

    <div class="mb-6">The World of Nuclear is a safe place to learn about all aspects of nuclear energy. We like to
      focus on verifiable truth and forward-thinking creativity. Skeptics and newbies are most welcome. Those who are
      already know about nuclear energy are also welcome to discuss and debate.</div>

    <div class="mb-12">Spend some time here. There's a lot to discover, as we build new ways to interact and learn.
      Enjoy!</div>

    <UDivider :avatar="{ src: '/images/radiation-symbol.svg' }" size="sm" />

    <h1 class="mt-12">Free activities and information. Enjoy!</h1>

    <JoinCta class="my-12" />

    <div class="feature-layout">
      <feature-tile v-for="feature in features" :id="feature.name" :feature="feature" />
    </div>
  </UContainer>

  <NuxtImg src="/images/pp-river-scene-w-won-logo.jpg" class="mx-auto my-12" />

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
    name: 'Flux',
    coverImage: '/images/flux-theme-v1.jpg',
    description:
      'Social media for ideas about nuclear energy. Share thoughts as they come to you.',
    callToAction: 'Start a Chain Reaction',
    routeName: 'flux',
  },
  {
    category: 'forum',
    name: 'What Say You?',
    coverImage: '/images/speech-bubbles.png',
    description:
      'Long-form discussions about nuclear energy. Share your perspective, and challenge others to share theirs.',
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
    category: 'hands-on',
    name: 'Simulators',
    coverImage: '/images/Cherenkov-radiation.jpg',
    description: 'Try nuclear simulators - fun and educational.',
    callToAction: 'Learn By Experiment',
    routeName: 'simulators',
  },
  {
    category: 'games',
    name: 'Fun & Games',
    coverImage: '/images/word-search.jpg',
    description: 'Games with a nuclear theme.',
    callToAction: "Let's Play",
    routeName: 'games',
  },
]
</script>

<style>
.zanzi-photo {
  float: left;
  margin-right: 1.5rem;
}

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
