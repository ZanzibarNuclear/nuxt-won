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
      to: 'daily-lessons',
    },
    {
      label: 'Simulators',
      icon: 'i-heroicons-cog',
      to: 'simulators',
    },
    {
      label: 'Fun and Games',
      icon: 'i-heroicons-puzzle-piece',
      to: 'fun-and-games',
    },
  ],
  [
    {
      label: "Zanzi's Nuclear Stack",
      icon: 'i-heroicons-document-text',
      to: 'https://zanzisnuclearstack.substack.com/',
      target: '_blank',
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
