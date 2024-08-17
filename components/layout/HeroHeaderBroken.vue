<template>
  <header class="mx-auto logo-container">
    <div className="grid grid-rows-2">
      <div class="flex justify-center">
        <NuxtLink to="/">
          <img src="/images/logo/logo-sq-smooth.jpg" alt="Logo" class="top-left h-20 w-20" />
        </NuxtLink>
        <span class="flex items-center w-full justify-around">
          <NuxtImg src="/images/won-logo-full.jpg" class="mt-6 pb-1" />
        </span>
        <AccountNavatarWidget class="top-right" />
      </div>
      <div class="row-span-1">
        <nav>
          <LayoutHorizontalMenu class="flex justify-center space-x-8 mt-4" />
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style scoped>
.logo-container {
  position: relative;
}

.top-left {
  position: absolute;
  top: 10px;
  left: 20px;
  z-index: 1;
}

.top-right {
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 1;
}
</style>