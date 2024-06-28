<template>
  <div class="w-48 dark:bg-stone-800">
    <UVerticalNavigation :links="links"> </UVerticalNavigation>
  </div>
</template>

<script setup>
const links = [
  [
    {
      label: 'Home',
      icon: 'i-heroicons-home',
      to: '/',
    },
    {
      label: 'What Say You',
      icon: 'i-heroicons-chat-bubble-left-ellipsis',
      to: '/wsy',
    },
    {
      label: 'Free Courses',
      icon: 'i-heroicons-academic-cap',
      to: '/learning',
    },
    {
      label: 'Simulators',
      icon: 'i-heroicons-cog',
      to: '/simulators',
    },
    {
      label: 'Fun and Games',
      icon: 'i-heroicons-puzzle-piece',
      to: '/games',
    },
    {
      label: 'Essays',
      icon: 'i-heroicons-newspaper',
      to: '/essays',
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
