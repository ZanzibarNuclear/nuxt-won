<template>
  <div class="w-48">
    <UVerticalNavigation :links="links"> </UVerticalNavigation>
  </div>
</template>

<script setup>
const links = [
  [
    {
      label: 'Nuclear News',
      icon: 'i-heroicons-newspaper',
      to: 'nuclear-news',
    },
    {
      label: 'What Say You',
      icon: 'i-heroicons-chat-bubble-left-ellipsis',
      to: 'what-say-you',
    },
    {
      label: 'Daily Lessons',
      icon: 'i-heroicons-academic-cap',
    },
    {
      label: 'Simulators',
      icon: 'i-heroicons-cog',
    },
    {
      label: 'Fun and Games',
      icon: 'i-heroicons-puzzle-piece',
    },
  ],
  [
    {
      label: "Zanzi's Nuclear Stack",
      icon: 'i-heroicons-document-text',
    },
    {
      label: 'Zanzibar on X',
      icon: 'i-ri-twitter-x-fill',
    },
    {
      label: 'Discord Chat Channel',
      icon: 'i-ic-baseline-discord',
    },
  ],
]
</script>

<style lang="scss" scoped></style>
