<template>
  <div class="border shadow-md p-8" :style="useBgColor">
    <div class="flex justify-center">
      <NuxtImg
        :src="image.src"
        :alt="image.alt"
        :title="image.caption"
        :width="useWidth"
        :height="image.height"
        class="text-center mb-2"
      />
    </div>
    <div v-if="image.caption" class="flex-row text-center">
      {{ image.caption }}
    </div>
    <div v-if="displayCredit" class="text-sm text-center">
      Credit: {{ image.credit.name }}
      <span v-if="image.credit.url"
        >(<NuxtLink :to="image.credit.url" external target="_blank"
          >source</NuxtLink
        ><UIcon name="i-ph-arrow-circle-up-right" />)</span
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
const useBgColor = computed(() => {
  if (props.image.bgColor) {
    console.log('has bgColor', props.image.bgColor)
    return { 'background-color': props.image.bgColor }
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

<style scoped>
a {
  color: navy;
}
</style>
