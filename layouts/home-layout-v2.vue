<template>
  <div class="dark">
    <div class="bg-nuclear-black min-h-screen text-nuclear-lightgray">
      <header class="text-center py-10">
        <h1 class="font-heading text-nuclear-cherenkov text-5xl">
          Welcome to World of Nuclear 🌌
        </h1>
        <p class="font-body mt-4 text-lg">
          Empowering the future with nuclear energy.
        </p>
      </header>
      <main class="container mx-auto px-4">
        <slot />
      </main>
      <footer>
        &copy; 2025 Nuclear Ambitions LLC
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>