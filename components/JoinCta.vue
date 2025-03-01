<template>
  <div v-if="!userStore.isSignedIn" class="border-2 border-yellow-400 p-2 text-center">
    <NuxtLink class="hover:text-yellow-400 text-yellow-600 visited:text-yellow-600" to="/join"
      >Why you should join
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
</script>

<style scoped></style>
