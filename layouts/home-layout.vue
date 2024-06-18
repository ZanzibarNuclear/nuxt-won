<template>
  <UContainer class="bg-hero-pattern bg-no-repeat bg-contain">
    <header>
      <div class="flex flex-center">
        <UButton
          size="md"
          variant="ghost"
          icon="i-mdi-menu"
          title="Navigation"
          @click="toggleLeftNavVisibility"
        />
        <UButton square variant="ghost" to="/">
          <template #leading>
            <NuxtImg src="/images/Zanzibar.svg" width="50px" />
          </template>
        </UButton>
        <AccountNavatarWidget class="corner" />
      </div>
    </header>
    <div class="flex gap-x-5">
      <div class="flex-col" :hidden="hideNav">
        <feature-menu />
      </div>
      <div class="flex-col w-full px-4 py-4">
        <slot />
      </div>
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
</style>
