<template>
  <UCard>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">User ID</span>
      <span class="col-span-3">{{ profile.id }}</span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">Screen Name</span>
      <span class="col-span-3">{{ profile.screenName }}</span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">Full Name</span>
      <span class="col-span-3">{{ profile.fullName }}</span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">Joined on</span>
      <span class="col-span-3">{{ profile.joinedAt }}</span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">Join Reason</span>
      <span class="col-span-3">{{ profile.joinReason }}</span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">Nuclear Likes</span>
      <span class="col-span-3">{{ profile.nuclearLikes }}</span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">X Username</span>
      <span class="col-span-3">@{{ profile.xUsername }}</span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">LinkedIn Profile Name</span>
      <span class="col-span-3">{{ profile.linkedInProfileName }}</span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">Last updated</span>
      <span class="col-span-3">{{ profile.updatedAt }}</span>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
const profile = useUserStore().profile
</script>

<style scoped>
.label {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-right: 3rem;
  text-align: right;
}
</style>
