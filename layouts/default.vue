<template>
  <UContainer class="bg-[#f6f2eb] dark:bg-slate-800 grid grid-cols-6 px-4 min-w-[600px] min-h-screen">
    <LayoutCompactHeader />
    <main class="mt-[100px] mb-16 w-full col-span-4 col-start-2">
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
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #f6f2eb;
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
