<template>
  <div class="w-48 bg-slate-200 dark:bg-slate-700">
    <UVerticalNavigation :links="links" labelClass="plain-link" />
  </div>
</template>

<script setup>
const links = [
  [
    {
      label: 'Home',
      icon: 'i-ph-house',
      to: '/',
    },
    {
      label: 'Flux',
      icon: 'i-ph-lightning',
      to: '/flux',
    },
    {
      label: 'What Say You',
      icon: 'i-ph-chat-centered-dots',
      to: '/wsy',
    },
    {
      label: 'Free Courses',
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
  ],
  [
    {
      label: "Zanzi's Nuclear Stack",
      icon: 'i-ph-article',
      to: 'https://zanzisnuclearstack.substack.com/',
      target: '_blank',
      external: true,
    },
    {
      label: 'Zanzibar on X',
      icon: 'i-ph-x-logo',
      to: 'https://x.com/ZanzibarNuclear',
      target: '_blank',
      external: true,
    },
  ],
]
</script>

<style lang="scss" scoped>
.plain-link {
  text-decoration: none;
}
</style>
