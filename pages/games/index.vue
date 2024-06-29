<template>
  <div>
    <h1>Fun and Games</h1>
    <div class="leading-6">
      <div class="my-4">
        Some day, people will visit this website because it is so much fun they
        cannot stay away. They will want to get that dopamine hit so badly that
        they will have a bookmark ready to click.
      </div>
      <div class="my-4">
        But for now, we have to settle for being mildly amusing.
      </div>
    </div>
    <h2>Word Search</h2>
    <div>
      Who doesn't love a good word search? We have loaded a few puzzles into
      this word search builder. And we found others. Check them out.
    </div>
    <ul>
      <li>
        <NuxtLink
          target="_blank"
          to="https://thewordsearch.com/puzzle/7220420/nuclear-power/"
          >Nuclear Power</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          target="_blank"
          to="https://thewordsearch.com/puzzle/7217440/particle-physics/"
          >Particle Physics</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          target="_blank"
          to="https://thewordsearch.com/puzzle/9018/nuclear/"
          >Nuclear</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          target="_blank"
          to="https://thewordsearch.com/puzzle/8464/atoms/"
          >Atoms</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          target="_blank"
          to="https://thewordsearch.com/puzzle/79207/atomic-theory/"
          >Atomic Theory</NuxtLink
        >
      </li>
    </ul>
    <h2>What Say You?</h2>
    <div class="my-4">
      The discussion forum is kind of a game. You start by introducing a topic,
      could be anything. Then you write something provocative or designed to get
      a rise out of others. The best part is that you can invite people to read
      and respond to your post.
    </div>
    <div>Try <NuxtLink to="/wsy">What Say You?</NuxtLink></div>
    <h2>Playing with AI</h2>
    <div class="my-4">
      We are experimenting with AI to help build this platform. For one
      experiment, we asked it to create a wordsearch generator. The result is
      decent. That is to say, it still needs a lot of work.
    </div>
    <NuxtLink to="/games/wordsearch">You can see for yourself.</NuxtLink>
    <div class="my-4">
      To be fair, the AI didn't think it was done, and asked for some guidance
      about what to do next. Also to be fair, the result you see was enhanced by
      humans...the original didn't quite work.
    </div>
  </div>
</template>

<script setup>
import { generateWordSearch } from '~/utils/wordSearchBuilder'

const words = ['reactor', 'fission', 'fusion', 'neutrons', 'chainreaction']
const puzzleA = generateWordSearch(words, 15)
for (let row of puzzleA) {
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
