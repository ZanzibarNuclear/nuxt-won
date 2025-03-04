<template>
  <UDivider :avatar="{ src: '/images/radiation-symbol.svg' }" size="sm" :ui="dividerStyle" />
</template>

<script setup lang="ts">
const dividerStyle = {
  border: { base: 'border-heroic-cherenkov dark:border-heroic-cherenkov' },
  avatar: { size: 'md' },
}
</script>

<style lang="scss" scoped></style>
