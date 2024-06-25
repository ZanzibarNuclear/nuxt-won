<template>
  <UCard v-if="profile">
    <div class="mb-4 grid grid-cols-4">
      <span class="label">User ID</span>
      <span class="col-span-3">{{ profile.id }}</span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">Screen Name</span>
      <span class="col-span-3">{{ profile.screen_name }}</span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">Full Name</span>
      <span class="col-span-3">{{ profile.full_name }}</span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">Joined on</span>
      <span class="col-span-3">{{ displayAsDate(profile.joined_at) }}</span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">Join Reason</span>
      <span class="col-span-3">{{ profile.join_reason }}</span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">Nuclear Likes</span>
      <span class="col-span-3">{{ profile.nuclear_likes }}</span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label"><icon name="i-ri-twitter-x-line" /></span>
      <span class="col-span-3">
        @{{ profile.x_username }} &nbsp; (<NuxtLink
          :to="`https://www.x.com/${profile.x_username}`"
          target="_blank"
          >Go to X <UIcon name="i-mdi-arrow-top-right" /></NuxtLink
        >)
      </span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">LinkedIn <icon name="i-mdi-linkedin" /></span>
      <span class="col-span-3">
        {{ profile.linkedin_profile_name }} &nbsp; (<NuxtLink
          :to="`https://www.linkedin.com/in/${profile.linkedin_profile_name}`"
          target="_blank"
          >Go to LinkedIn <UIcon name="i-mdi-arrow-top-right" /></NuxtLink
        >)
      </span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">Last updated</span>
      <span class="col-span-3">{{
        displayAsDateTime(profile.updated_at)
      }}</span>
    </div>
  </UCard>
  <div v-else>No profile found.</div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const profile = computed(() => {
  return userStore.profile || {}
})
</script>

<style scoped>
.label {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-right: 3rem;
  text-align: right;
}
</style>
