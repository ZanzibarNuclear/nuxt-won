<template>
  <UContainer class="bg-[#f6f2eb] dark:bg-slate-800 grid grid-cols-6 px-4 min-w-96 min-h-screen">
    <LayoutBasicHeader />
    <main class="w-full col-span-4 col-start-2">
      <slot />
    </main>
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
