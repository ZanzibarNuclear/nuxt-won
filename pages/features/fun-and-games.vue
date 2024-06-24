<template>
  <h1>Fun and Games</h1>
  <div class="leading-6">
    <div class="mb-4">
      Some day, people will visit this website because it is so much fun that
      they cannot stay away. They will want to get that dopamine hit so badly
      that they will click on that bookmark and end up here.
    </div>
    <div class="mb-4">
      But for now, we have to settle for being somewhat amusing.
    </div>
  </div>
  <h2>Word Search</h2>
  <div>
    I mean who doesn't love a good word search. We have loaded a few puzzles
    into this word search builder. Check them out.
  </div>
  <ul>
    <li>
      <NuxtLink to="https://thewordsearch.com/puzzle/7220420/nuclear-power/"
        >Nuclear Power</NuxtLink
      >
    </li>
    <li>
      <NuxtLink to="https://thewordsearch.com/puzzle/7217440/particle-physics/"
        >Particle Physics</NuxtLink
      >
    </li>
  </ul>
  <div class="my-6">
    Find more interesting links
    <NuxtLink to="http://localhost:3000/wsy?topic=LFcTQTwwRo"
      >here in this discussion topic</NuxtLink
    >. Join <span class="italic font-bold">What Say You?</span> and add to the
    discussion.
  </div>
</template>

<script setup>
import { generateWordSearch } from '~/utils/worksearchByClaude'

const words = ['reactor', 'fission', 'fusion', 'neutrons', 'chainreaction']
const puzzle = generateWordSearch(words, 15)
for (let row of puzzle) {
  console.log(row.join(' '))
}
</script>

<style lang="scss" scoped>
ul {
  list-style-type: lower-greek;
  list-style-position: inside;
  margin-top: 1rem;
  margin-left: 2rem;
  font-size: x-large;
}
li {
  margin-bottom: 0.5rem;
}
</style>
