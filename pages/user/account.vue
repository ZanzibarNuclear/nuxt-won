<template>
  <UContainer>
    <AccountDetails v-if="user" />
    <SupabaseMagicLinkWidget v-else />
  </UContainer>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
</script>

<style scoped></style>
