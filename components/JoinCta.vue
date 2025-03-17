<template>
  <div v-if="!userStore.isSignedIn" class="border-2 p-2 text-center">
    <NuxtLink to="/join">Join Zanzibar's World of Nuclear Energy!</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
</script>

<style scoped></style>
