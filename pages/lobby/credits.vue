<template>
  <div class="w-3/4">
    <h2>Credits</h2>
    <div>
      We hope you are enjoying the World of Nuclear. These are the people and technologies that make
      this possible. Apologies to those we have neglected to mention.
    </div>
    <div></div>
    <ul>
      <li>The extended Nuxt team</li>
      <li>The VueJS team</li>
      <li>The Tailwind CSS team</li>
      <li>The fastify team</li>
      <li>The Postgres team</li>
      <li>Tiptap, ProseMirror</li>
      <li>The Visual Source Code team</li>
      <li>AI systems: Cursor, Perplexity, Claude, ChatGPT, OpenArt.AI</li>
      <li>Everyone who has ever contributed to JavaScript and TypeScript</li>
      <li>Anyone who has worked on Linux, especially Ubuntu</li>
      <li>Cloudflare, Resend, Hetzner</li>
      <li><em>How to Drive a Nuclear Reactor</em>, by Colin Tucker</li>
      <li>
        Nuclear scientists and engineers who have contributed discoveries, knowledge, and experience
      </li>
      <li>
        Dr Seuss for his essay
        <NuxtLink
          to="https://www.mit.edu/people/dpolicar/writing/poetry/poems/tooManyDaves.html"
          external
          ><em>Too Many Daves</em></NuxtLink
        >
      </li>
      <li>Many, many more</li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
a {
  @apply text-heroic-cherenkov hover:text-nuclear-600;
}
</style>
