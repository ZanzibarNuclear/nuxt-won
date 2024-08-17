<template>
  <UContainer class="bg-hero-pattern bg-no-repeat bg-contain w-7/8 mx-auto">
    <LayoutHeroHeader />
    <div class="grid grid-cols-5 w-full px-4">
      <nav class="col-span-1">
        <LayoutFeatureMenu />
      </nav>
      <div class="col-span-4">
        <slot />
      </div>
    </div>
    <LayoutFooter />
  </UContainer>
</template>

<script setup lang="ts">
const hideNav = ref(true)
const toggleLeftNavVisibility = () => {
  hideNav.value = !hideNav.value
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
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
  margin-top: 4rem;
  margin-bottom: 1rem;
}
</style>
