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
// const { data: surround } = await useAsyncData('surround', () => {
//   return queryCollectionItemSurroundings('join', route.path)
// })
// const prev = computed(() => {
//   if (surround.value && surround.value[0]) {
//     return surround.value[0]
//   } else {
//     return null
//   }
// })
// const next = computed(() => {
//   if (surround.value && surround.value[1]) {
//     return surround.value[1]
//   } else {
//     return null
//   }
// })
</script>

<style scoped>
main {
  border: 1px solid white;
}
</style>
