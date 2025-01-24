<template>
  <footer class="p-4 w-full rounded-xl col-span-6 text-center">
    <div>
      <UHorizontalNavigation
        :links="footerLinks"
        class="flex justify-center space-x-8 mt-4 dark:border-gray-800 dark:bg-slate-800"
      />
    </div>
    &copy; 2025
    <NuxtLink to="https://nuclearambitions.com" :external="true">Nuclear Ambitions LLC</NuxtLink>
  </footer>
</template>

<script setup lang="ts">
const footerLinks = [
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
  {
    label: 'Opinions and Observations',
    icon: 'i-ph-article',
    to: 'https://davemount.substack.com/',
    target: '_blank',
    external: true,
  },
]
</script>

<style scoped></style>
