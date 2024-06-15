<template>
  <div class="w-48">
    <UVerticalNavigation :links="links"> </UVerticalNavigation>
  </div>
</template>

<script setup>
const links = [
  [
    {
      label: 'What Say You',
      icon: 'i-heroicons-chat-bubble-left-ellipsis',
      to: '/wsy',
    },
    {
      label: 'Daily Lessons',
      icon: 'i-heroicons-academic-cap',
      to: '/features/daily-lessons',
    },
    {
      label: 'Simulators',
      icon: 'i-heroicons-cog',
      to: '/features/simulators',
    },
    {
      label: 'Fun and Games',
      icon: 'i-heroicons-puzzle-piece',
      to: '/features/fun-and-games',
    },
    {
      label: 'News & Essays',
      icon: 'i-heroicons-newspaper',
      to: '/features/nuclear-news',
    },
  ],
  [
    {
      label: "Zanzi's Nuclear Stack",
      icon: 'i-heroicons-document-text',
      to: 'https://zanzisnuclearstack.substack.com/',
      target: '_blank',
      external: true,
    },
    {
      label: 'Zanzibar on X',
      icon: 'i-heroicons-x-mark',
      to: 'https://x.com/ZanzibarNuclear',
      target: '_blank',
      external: true,
    },
  ],
]
</script>

<style lang="scss" scoped></style>
