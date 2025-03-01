<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <ContentRenderer :value="post" class="prose prose-stone dark:prose-invert p-3 mx-auto" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const { data: post } = await useAsyncData(() => {
  return queryCollection('join').path(route.path).first()
})
</script>

<style scoped>
main {
  border: 1px solid white;
}
</style>
