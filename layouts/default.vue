<template>
  <UContainer class="w-7/8 mx-auto">
    <header class="py-4">
      <div class="grid grid-cols-6 gap-4">
        <div class="col-span-4">
          <div class="logo-menu">
            <div class="logo">
              <NuxtImg src="/images/logo/logo-sq-smooth.jpg" class="pt-3" />
            </div>
          </div>
          <div class="title-bar text-center font-bold text-3xl text-slate-400 border-t-2 border-b-2 py-1">
            Zanzibar's World of Nuclear Energy
          </div>
        </div>
        <div class="col-span-2">
          <AccountNavatarWidget />
        </div>
        <div class="grid col-span-6">
          <horizontal-menu />
        </div>
      </div>
    </header>
    <main class="flex-col mx-auto pt-16 px-14 py-4">
      <slot />
    </main>
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
