<template>
  <div>
    <h1>Hello, World of Nuclear!</h1>
    <p>Today I am {{ age }} <button @click="older">+</button> years old.</p>
  </div>
</template>

<script setup>
const age = ref(4)
const older = () => {
  age.value += 1
}
</script>

<style scoped>
h1 {
  color: teal;
  margin-bottom: 1.5rem;
  font-size: xx-large;
}
</style>
