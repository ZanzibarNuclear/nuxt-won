<template>
  <header>
    <div class="flex grow-0 items-center justify-between shadow-lg my-4">
      <NuxtImg src="/images/logo/logo-cherenkov-clear-bg.png" alt="World of Nuclear logo" />
    </div>
    <div v-if="!hideNav">
      <NavMenu />
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  hideNav: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped></style>
