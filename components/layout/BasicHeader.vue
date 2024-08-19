<template>
  <header class="mx-auto my-12 logo-container">
    <div className="grid grid-rows-2">
      <NuxtLink to="/">
        <NuxtImg src="/images/logo/logo-sq-smooth.jpg" alt="Logo" width="60" height="60" class="top-left" />
      </NuxtLink>
      <div class="flex items-center w-full justify-around">
        <span class="mt-6 pb-1 text-3xl text-slate-400 border-t-2 border-b-2 border-slate-400">Zanzibar's World of
          Nuclear
          Energy</span>
      </div>
      <AccountNavatarWidget class="top-right" />
      <nav>
        <LayoutHorizontalMenu class="flex justify-center space-x-8 mt-4" />
      </nav>
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