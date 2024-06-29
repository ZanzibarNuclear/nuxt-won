<template>
  <UContainer class="bg-regular-pattern bg-no-repeat bg-contain">
    <header>
      <div class="flex flex-center">
        <UButton
          size="md"
          variant="ghost"
          icon="i-mdi-menu"
          title="Navigation"
          @click="toggleLeftNavVisibility"
          class="sandwich-bump"
        />
        <AccountNavatarWidget class="corner" />
      </div>
    </header>
    <div class="flex gap-x-5">
      <div class="flex-col mt-14" :hidden="hideNav">
        <feature-menu />
      </div>
      <main class="flex-col w-5/6 mx-auto mt-6 px-14 py-4">
        <slot />
      </main>
    </div>
    <footer class="text-center">
      &copy; Copyright 2024, Nuclear Ambitions
    </footer>
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
  margin-top: 1rem;
  margin-bottom: 3rem;
}
footer {
  margin-top: 5rem;
  margin-bottom: 1rem;
}
.title {
  flex: 1;
  text-align: center;
}
.corner {
  margin-left: auto;
}
.sandwich-bump {
  position: relative;
  top: 100px;
}
</style>
