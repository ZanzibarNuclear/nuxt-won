<template>
  <USeparator :avatar="{ src: '/images/radiation-symbol.svg' }" :ui="uiStyle" />
</template>

<script setup lang="ts">
const uiStyle = ref({
  avatarSize: '2xl',
})
</script>

<style lang="scss" scoped></style>
