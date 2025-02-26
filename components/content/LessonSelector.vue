<template>
  <ClientOnly>
    <div v-if="lesson">
      <ContentRenderer v-if="lesson" :value="lesson" />
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
const lesson = ref()
const load = async () => {
  const { data } = await useAsyncData('benefits', () => {
    return queryCollection('lessons').where('path', '=', '/lessons/why_nuclear').first()
  })
  lesson.value = data.value
}
await load()
</script>

<style></style>
