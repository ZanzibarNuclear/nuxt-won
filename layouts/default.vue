<template>
  <UContainer>
    <header>
      <div class="logo-menu">
        <div class="logo">
          <NuxtImg src="/images/logo/logo-sq-smooth.jpg" class="pt-3" />
        </div>
      </div>
      <div class="title-bar text-center font-bold text-3xl text-slate-400 border-t-2 border-b-2 py-1">
        Zanzibar's
        World of
        Nuclear Energy
      </div>
      <div class="p-4">
        <AccountNavatarWidget />
      </div>
    </header>
    <div class="flex gap-x-5">
      <div class="menu-sandwich">
        <UButton size="md" variant="ghost" icon="i-ph-list-bold" title="Navigation" @click="toggleLeftNavVisibility" />
      </div>
      <div class="flex-col" :hidden="hideNav">
        <feature-menu />
      </div>
      <main class="flex-col w-5/6 mx-auto pt-16 px-14 py-4">
        <slot />
      </main>
    </div>
    <footer class="text-center">&copy; 2024 Nuclear Ambitions LLC</footer>
  </UContainer>
</template>

<script setup lang="ts">
const hideNav = ref(true)
const toggleLeftNavVisibility = () => {
  hideNav.value = !hideNav.value
}
</script>

<style scoped>
.logo-container {
  position: relative;
}

.title-bar {
  position: relative;
  z-index: 0;
}

.logo-above {
  position: absolute;
  top: -10px;
  left: 20px;
  z-index: 1;
}

header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 1.0rem;
}

.logo-menu {
  display: flex;
  align-items: center;
}

.logo img {
  width: 75px;
}

.menu-sandwich {
  font-size: 24px;
  margin-left: 1.0rem;
  cursor: pointer;
}

/* Responsive design */
@media screen and (max-width: 600px) {
  header {
    flex-direction: column;
    align-items: flex-start;
  }

  .account {
    align-self: flex-end;
  }
}

footer {
  margin-top: 5rem;
  margin-bottom: 1rem;
}
</style>
