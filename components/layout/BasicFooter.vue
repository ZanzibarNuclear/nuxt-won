<template>
  <footer class="my-4 w-3/4 min-w-80">
    <div>
      <div class="flex flex-row justify-around text-heroic-cherenkov mb-4">
        <div>
          <UButton
            to="https://hero.worldofnuclear.com"
            icon="i-heroicons-home-modern"
            label="Start"
            variant="ghost"
          />
        </div>
        <div>
          <UButton
            to="/guide"
            icon="i-heroicons-map"
            label="Guide"
            variant="ghost"
          />
        </div>
        <UButton
          to="/credits"
          icon="i-heroicons-trophy"
          label="Credits"
          variant="ghost"
        />
      </div>
      <UHorizontalNavigation :links="footerLinks" />
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

<style lang="scss" scoped></style>
