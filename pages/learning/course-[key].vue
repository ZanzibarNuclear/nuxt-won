<template>
  <div>
    <h1>Check it out!</h1>
    <h2>This may be the course you are looking for.</h2>
    <div>{{ coursePublicKey }}</div>
    <div>Title</div>
    <div>Description</div>
    <div>
      <h3>Lessons</h3>
      <ol>
        <li>What is an atom?</li>
        <li>Parts of an atom</li>
        <li>Quantum mechanics - just a taste</li>
      </ol>
    </div>
    <h3>Syllabus</h3>
    <div>syllabus</div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const coursePublicKey = route.params.key

onMounted(() => {})
</script>

<style scoped>
ol {
  list-style-type: decimal;
  list-style-position: inside;
}
</style>
