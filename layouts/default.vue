<template>
  <UContainer>
    <header>This is on every page at the top.</header>
    <slot />
    <footer>&copy; Copyright 2024. This is on every page at the bottom.</footer>
  </UContainer>
</template>

<style scoped>
.default {
  border: 1px solid teal;
  padding: 1rem;
  position: relative;
}
header {
  margin-top: 1rem;
  margin-bottom: 3rem;
}
footer {
  margin-top: 5rem;
  margin-bottom: 1rem;
}
</style>
