<template>
  <div>
    <h1>Hello, World of Nuclear!</h1>
    <age-declaration :age="age" @increment="older" @decrement="younger" />
  </div>
</template>

<script setup>
const age = ref(4)
const older = () => {
  age.value += 1
}
const younger = () => {
  age.value -= 1
}
</script>

<style scoped>
h1 {
  color: primary;
  margin-bottom: 1.5rem;
  font-size: xx-large;
}
</style>
