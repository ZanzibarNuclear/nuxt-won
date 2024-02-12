<template>
  <UContainer>
    <header>
      <UButton to="/" icon="i-heroicons-home" variant="ghost" />
      This is on every page at the top.
    </header>
    <div class="flex gap-x-5">
      <div class="flex-col">
        <feature-menu />
      </div>
      <div class="flex-col bg-gray-800 w-full px-4 py-4">
        <slot />
      </div>
    </div>
    <footer>&copy; Copyright 2024, The Nuclear Stack, LLC.</footer>
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
