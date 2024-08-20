<template>
  <header class="p-4 w-full rounded-xl col-span-6">
    <div className="grid grid-rows-2 logo-container">
      <NuxtLink to="/">
        <NuxtImg src="/images/logo/logo-sq-smooth.jpg" alt="Logo" width="100" class="top-left" />
      </NuxtLink>
      <div class="title-bar text-center font-bold text-3xl text-slate-400 border-t-2 border-b-2">
        Zanzibar's World of Nuclear Energy
      </div>
      <AccountNavatarWidget class="top-right" />
      <LayoutHorizontalMenu />
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
  left: 50px;
  z-index: 1;
}

.top-right {
  position: absolute;
  top: 10px;
  right: 50px;
  z-index: 1;
}
</style>