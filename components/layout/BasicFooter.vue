<template>
  <footer class="my-4 w-3/4 min-w-80">
    <div>
      <div class="flex flex-row justify-around text-heroic-cherenkov mb-4">
        <UButton
          :to="{ name: 'lobby-gallery' }"
          icon="i-ph-image-duotone"
          label="Art Gallery"
          variant="ghost"
        />
        <UButton
          :to="{ name: 'lobby-guide' }"
          icon="i-ph-map-trifold-duotone"
          label="Guide"
          variant="ghost"
        />
        <UButton
          :to="{ name: 'lobby-credits' }"
          icon="i-ph-medal-duotone"
          label="Credits"
          variant="ghost"
        />
      </div>
    </div>
    <div>
      <div class="flex flex-row justify-around text-heroic-cherenkov mb-4">
        <UButton
          to="https://x.com/ZanzibarNuclear"
          icon="i-ph-x-logo-duotone"
          label="Zanzibar on X"
          variant="ghost"
        />
        <UButton
          to="https://zanzisnuclearstack.substack.com/"
          icon="i-ph-article-ny-times-duotone"
          label="Zanzi's Nuclear Stack"
          variant="ghost"
        />
        <UButton
          to="https://davemount.substack.com/"
          icon="i-ph-article-ny-times-duotone"
          label="Opinions and Observations"
          variant="ghost"
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
// const footerLinks = [
//   {
//     label: "Zanzi's Nuclear Stack",
//     icon: 'i-ph-article',
//     to: 'https://zanzisnuclearstack.substack.com/',
//     target: '_blank',
//     external: true,
//   },
//   {
//     label: 'Zanzibar on X',
//     icon: 'i-ph-x-logo',
//     to: 'https://x.com/ZanzibarNuclear',
//     target: '_blank',
//     external: true,
//   },
//   {
//     label: 'Opinions and Observations',
//     icon: 'i-ph-article',
//     to: 'https://davemount.substack.com/',
//     target: '_blank',
//     external: true,
//   },
// ]
</script>

<style lang="scss" scoped></style>
