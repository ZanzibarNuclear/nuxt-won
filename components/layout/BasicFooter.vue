<template>
  <footer class="my-4 w-3/4 min-w-80">
    <div>
      <div class="flex flex-wrap text-heroic-cherenkov mb-4">
        <UButton
          v-for="link in footerLinks"
          :to="link.to"
          :icon="link.icon"
          :label="link.label"
          variant="ghost"
          block
          class="sm:w-1/2 md:w-1/3 p-2"
        />
      </div>
    </div>
    <div class="text-center">
      <NuxtLink external to="https://nuclearambitions.com"
        >&copy; 2025 Nuclear Ambitions LLC</NuxtLink
      >
    </div>
  </footer>
</template>

<script setup>
const footerLinks = [
  {
    label: 'Art Gallery',
    icon: 'i-ph-image-duotone',
    to: { name: 'lobby-gallery' },
  },
  {
    label: 'Art Gallery',
    icon: 'i-ph-map-trifold-duotone',
    to: { name: 'lobby-guide' },
  },
  {
    label: 'Credits',
    icon: 'i-ph-medal-duotone',
    to: { name: 'lobby-credits' },
  },
  {
    label: "Zanzi's Nuclear Stack",
    icon: 'i-ph-article-ny-times-duotone',
    to: 'https://zanzisnuclearstack.substack.com/',
  },
  {
    label: 'Zanzibar on X',
    icon: 'i-ph-x-logo-duotone',
    to: 'https://x.com/ZanzibarNuclear',
  },
  {
    label: 'Opinions and Observations',
    icon: 'i-ph-article-ny-times-duotone',
    to: 'https://davemount.substack.com/',
  },
]
</script>

<style lang="scss" scoped></style>
