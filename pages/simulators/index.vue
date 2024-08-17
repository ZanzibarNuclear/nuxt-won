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
