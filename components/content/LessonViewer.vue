<template>
  <ClientOnly>
    <div v-if="lesson">
      <ContentRenderer v-if="lesson" :value="lesson" />
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
const route = useRoute()
const lesson = ref()
const load = async () => {
  const { data } = await useAsyncData('benefits', () => {
    return queryCollection('lessons').path(route.path).first()
  })
  lesson.value = data.value
}
await load()
</script>

<style></style>
