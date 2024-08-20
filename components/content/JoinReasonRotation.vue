<template>
  <ClientOnly>
    <div v-if="chosen">
      <ContentRenderer :value="chosen">
        <ContentRendererMarkdown :value="chosen" />
      </ContentRenderer>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
const chosen = ref()
const loadReason = async () => {
  const { data } = await useAsyncData(() => queryContent('join/_reasons').where({ _partial: true }).find())
  if (!data.value || !data.value.length) {
    return
  }
  const numReasons = data.value ? data.value.length : 0
  console.log(`chosen reason: ${numReasons}`)

  const index = Math.floor(Math.random() * numReasons)
  chosen.value = data.value ? data.value[index] : null
}
await loadReason()
</script>

<style></style>
