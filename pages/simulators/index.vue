<template>
  <div>
    <h1>Simulators</h1>
    <div class="my-4 text-md">
      <p>
        Some day you will be able to start and care for your own simulated
        nuclear power plant. How awesome is that? Super awesome.
      </p>

      <p>But we don't have this yet. Instead, try <NuxtLink to="/wsy">What Say You?</NuxtLink>
      </p>
    </div>
    <h1>Fantasy Games</h1>
    <p>Once we have a decent set of simulations, we can create some interesting fantasy role-playing games. Running a
      real power plant is probably exciting enough. To learn, why not make things a little spicier?
      This might be where you work.</p>
    <NuxtImg src="/images/concept-art/nuclear-power-plant-along-river.jpg" />
    Or here.
    <NuxtImg src="/images/concept-art/riverside-power-plant.jpg" />

    <p class="my-4 text-md">Choose a character that suits your mood. Just a few ideas, easy to make more.</p>
    <NuxtImg src="/images/concept-art/lab-tech-female.jpg" />
    <NuxtImg src="/images/concept-art/genius-male-1.jpg" />
    <NuxtImg src="/images/concept-art/genius-female-1.jpg" />
    <p class="my-4 text-md">When things start to get intense, you might find yourself in a scene like this...</p>
    <NuxtImg src="/images/concept-art/run-your-own-pp_action-hero.jpg" />
    <p class="my-4 text-md">Or maybe the story is set in the future that mimics the past in strange ways. Save the world
      with nuclear energy as a warrior or a wizard.</p>
    <NuxtImg src="/images/concept-art/nuclear-knight-2.jpg" />
    <NuxtImg src="/images/concept-art/nuclear-wizard-v2.jpg" />
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'World of Nuclear - Simulations',
  ogTitle: 'World of Nuclear - Simulations',
  description:
    'Play with our simulators to improve your instincts about how nuclear energy can benefit humanity.',
  ogDescription:
    'Play with our simulators to improve your instincts about how nuclear energy can benefit humanity.',
})
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0.75em;
}
</style>
