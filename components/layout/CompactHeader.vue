<template>
  <header
    class="fixed top-0 left-0 right-0 bg-heroic-uranium dark:bg-heroic-graphite border-b border-gray-200 z-10 min-w-[600px]"
  >
    <div class="max-w-7xl mx-auto mt-4 px-4 py-3 flex items-center relative">
      <NuxtLink to="/">
        <NuxtImg
          src="/images/logo/logo-cherenkov-clear-bg.png"
          alt="World of Nuclear Logo"
          class="-mt-4"
          height="60"
        />
      </NuxtLink>
      <DarkToggle />
      <AccountNavatarWidget class="-mt-3 ml-auto" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import DarkToggle from '../DarkToggle.vue'
</script>

<style>
.app-header {
  transition: top 0.3s;
  position: fixed;
  top: 0;
  width: 100%;
  height: 75px;
  z-index: 10;

  background-image: url('/images/ocean-cliff-1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
