<template>
  <header class="app-header fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10 min-w-[600px]">
    <div class="max-w-7xl mx-auto mt-4 px-4 py-3 flex items-center relative">
      <NuxtLink to="/">
        <NuxtImg src="/images/won-logo-sq.jpg" alt="World of Nuclear Logo" class="w-12 h-12 -mt-4" />
      </NuxtLink>
      <h1
        class="absolute left-1/2 -translate-x-1/2 text-x3l font-bold text-[nuclear-blue] bg-[#f6f2eb]/30 backdrop-blur-sm rounded-lg p-1">
        World of
        Nuclear
      </h1>
      <AccountNavatarWidget class="-mt-3 ml-auto" />
    </div>
    <LayoutHorizontalMenu class="-mt-5" />
  </header>
</template>

<script lang="ts" setup>

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