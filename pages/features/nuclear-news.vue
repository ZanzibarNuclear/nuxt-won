<template>
  <h1>News & Essays</h1>
  <div>See what everyone is saying about nuclear energy.</div>
  <ul>
    <li>News</li>
    <li>Fake News</li>
    <li><NuxtLink to="/essays">Opinions</NuxtLink></li>
    <li><NuxtLink to="/essays">Deep Thoughts</NuxtLink></li>
    <li>Works of Fiction</li>
  </ul>
</template>

<script setup></script>

<style lang="scss" scoped>
ul {
  list-style-type: lower-greek;
  list-style-position: inside;
  margin-top: 1rem;
  margin-left: 2rem;
  font-size: x-large;
}
li {
  margin-bottom: 0.5rem;
}
</style>
