<template>
  <div>
    <h1>Simulators</h1>
    <div class="my-4 text-md">
      <p>
        Build and run your own pressurized water reactor (PWR). This is going to be super fun when it's working.
      </p>
      <p>
        This is a work in progress. Want to see what we have so far? <NuxtLink
          to="https://won-sim-go-175440446399.us-west1.run.app/">Take a look.</NuxtLink>
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
