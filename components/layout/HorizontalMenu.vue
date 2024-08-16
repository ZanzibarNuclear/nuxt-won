<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>

<script setup lang="ts">
const links = [
  // {
  //   label: 'Home',
  //   icon: 'i-ph-house',
  //   to: '/',
  // },
  {
    label: 'What Say You',
    icon: 'i-ph-chat-centered-dots',
    to: '/wsy',
  },
  {
    label: 'Fun Lessons',
    icon: 'i-ph-graduation-cap',
    to: '/learning',
  },
  {
    label: 'Simulators',
    icon: 'i-ph-gear-fine',
    to: '/simulators',
  },
  {
    label: 'Fun and Games',
    icon: 'i-ph-puzzle-piece',
    to: '/games',
  },
  {
    label: 'News & Perspective',
    icon: 'i-ph-newspaper',
    to: 'https://blog.worldofnuclear.com',
  },
]
</script>

<style scoped></style>