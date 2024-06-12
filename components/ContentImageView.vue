<template>
  <div>
    <div class="flex justify-center">
      <NuxtImg
        :src="image.src"
        :alt="image.alt"
        :title="image.caption"
        :width="useWidth"
        :height="image.height"
        class="text-center"
      />
    </div>
    <div v-if="image.caption" class="flex-row text-center">
      {{ image.caption }}
    </div>
    <div v-if="displayCredit" class="text-sm text-center">
      Credit: {{ image.credit.name }}
      <span v-if="image.credit.url"
        ><NuxtLink to="image.credit.url">source</NuxtLink></span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['image'])
const useWidth = computed(() => {
  if (props.image.width) {
    return props.image.width
  } else if (!props.image.height) {
    return '400px'
  } else {
    return null
  }
})
const displayCredit = computed(() => {
  return (
    props.image.credit && (props.image.credit.name || props.image.credit.url)
  )
})
</script>

<style scoped></style>
