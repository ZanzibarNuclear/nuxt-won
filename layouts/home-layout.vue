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
        <NuxtImg src="/images/Zanzibar.svg" class="pt-5" width="75px" />
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
header {
  margin-top: 1rem;
  margin-bottom: 2rem;
}
footer {
  margin-top: 4rem;
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
