<template>
  <UContainer>
    <AccountDetails v-if="user" />
    <SupabaseMagicLinkWidget v-else />
  </UContainer>
</template>

<script setup>
const user = useSupabaseUser()
</script>

<style scoped></style>
