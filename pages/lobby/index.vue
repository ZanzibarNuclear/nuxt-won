<template>
  <UContainer>
    <h1 class="mb-12 text-center text-3xl font-bold">
      Welcome to Zanzibar's World of Nuclear Energy!
    </h1>

    <nuxt-img src="/images/Zanzibar-2024-07.jpg" width="250px" class="zanzi-photo" />

    <div class="mb-6">
      I am Zanzibar, your upbeat nuclear hero. I bring positive energy to the discussion about the
      productive uses of nuclear energy. The technology is ready for humanity to thrive.
    </div>

    <div class="mb-6">
      The World of Nuclear is a safe place to learn about all aspects of nuclear energy. We like to
      focus on verifiable truth and forward-thinking creativity. Skeptics and newbies are most
      welcome. Those who are already know about nuclear energy are also welcome to discuss and
      debate.
    </div>

    <div class="mb-12">
      Spend some time here. There's a lot to discover, as we build new ways to interact and learn.
      Enjoy!
    </div>

    <WonDivider />

    <h1 class="mt-12">Free activities and information. Enjoy!</h1>

    <JoinCta class="my-12" />

    <div class="feature-layout">
      <feature-tile v-for="feature in features" :id="feature.name" :feature="feature" />
    </div>
  </UContainer>

  <NuxtImg src="/images/pp-river-scene-w-won-logo.jpg" class="mx-auto my-12" />
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
    name: 'Flux',
    coverImage: '/images/flux-theme-v1.jpg',
    description:
      'Share your thoughts about nuclear energy. Learn what others think. Start a chain reaction.',
    callToAction: 'Start a chain Reaction',
    outsideRoute: 'https://flux.worldofnuclear.com',
  },
  {
    category: 'learning',
    name: 'Mini Lessons',
    coverImage: '/images/Cherenkov-radiation.jpg',
    description:
      'Learn everything related to nuclear energy. Build a foundation of fundamental concepts.',
    callToAction: 'Get smarter every day',
    routeName: 'learning',
  },
  {
    category: 'gaming',
    name: 'Adventure',
    coverImage: '/images/concept-art/nuclear-knight-2.jpg',
    description: 'Discover what was lost.',
    callToAction: 'Begin the journey',
    outsideRoute: 'https://hero.worldofnuclear.com',
  },
  {
    category: 'information',
    name: 'Essays & Info',
    coverImage: '/images/concept-art/genius-female-1.jpg',
    description: 'Long-form writing about nuclear energy. Collections of useful resources.',
    callToAction: 'Open your mind',
    outsideRoute: 'https://blog.worldofnuclear.com',
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
