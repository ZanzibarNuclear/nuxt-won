<template>
  <UContainer>
    <header>This is on every page at the top.</header>
    <div class="flex">
      <div class="flex-col">
        <feature-menu />
      </div>
      <div class="flex-col">
        <slot />
      </div>
    </div>
    <footer>&copy; Copyright 2024. This is on every page at the bottom.</footer>
  </UContainer>
</template>

<style scoped>
header {
  margin-top: 1rem;
  margin-bottom: 3rem;
}
footer {
  margin-top: 5rem;
  margin-bottom: 1rem;
}
</style>
