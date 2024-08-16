<template>
  <header class="py-4 mx-auto logo-container">
    <div className="grid grid-rows-2 gap-4">
      <NuxtLink to="https://worldofnuclear.com">
        <img src="/images/logo/logo-sq-smooth.jpg" alt="Logo" class="logo-above h-20 w-20" />
      </NuxtLink>
      <div class="flex items-center w-full justify-around">
        <span class="text-3xl text-slate-400 border-t-2 border-b-2">Zanzibar's World of Nuclear
          Energy</span>
      </div>
      <AccountNavatarWidget class="account-above" />
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

.logo-above {
  position: absolute;
  top: 10px;
  left: 20px;
  z-index: 1;
}

.account-above {
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 1;
}
</style>