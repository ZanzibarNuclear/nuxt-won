<template>
  <UContainer class="w-7/8 mx-auto bg-[#f6f2eb] dark:bg-slate-800 ">
    <LayoutBasicHeader />
    <main class="flex-col mx-auto my-16 px-14">
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
