<template>
  <div>
    <h1>Learn about nuclear energy</h1>
    <div class="my-4">
      Enjoy these free courses on topics related to the productive use of
      nuclear energy. We will cover everything, from the fundamental physics and
      engineering to power generation and medical treatments.
    </div>
    <div class="my-4">
      Each lesson is designed to be consumable in ten minutes or less. That
      means you will be able to complete one or two lessons per day. Also, it's
      simple to repeat lessons to reinforce what you have learned.
    </div>
    <div class="my-4">
      For now, everything you see is <span class="bold">free</span>. All we ask
      is that you
      <NuxtLink :to="{ name: 'auth-sign-in' }"
        >register for a free account</NuxtLink
      >. That way we will know who is enjoying our courses. Plus, you will gain
      access to other members-only features of the World of Nuclear. So sign up
      today, and jump right in.
    </div>
    <div>
      <UButton to="/learning" label="Go to Lessons" />
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'World of Nuclear - Lessons',
  ogTitle: 'World of Nuclear - Lessons',
  description:
    'Learn about the power of nuclear energy, one concept at a time. Start at a high level and break things down, or build up from fundamentals. We cover science, engineering, psychology, myths - anything that can help you improve your understanding of nuclear energy.',
  ogDescription:
    'Learn about the power of nuclear energy, one concept at a time. Start at a high level and break things down, or build up from fundamentals. We cover science, engineering, psychology, myths - anything that can help you improve your understanding of nuclear energy.',
})
</script>

<style lang="scss" scoped></style>
