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
      <span class="col-span-3">{{ formatToDate(profile.joinedAt) }}</span>
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
      <span class="label"><icon name="i-ri-twitter-x-line" /></span>
      <span class="col-span-3">
        @{{ profile.xUsername }} &nbsp; (<NuxtLink
          :to="`https://www.x.com/${profile.xUsername}`"
          target="_blank"
          >Try it <UIcon name="i-mdi-arrow-top-right" /></NuxtLink
        >)
      </span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">LinkedIn <icon name="i-mdi-linkedin" /></span>
      <span class="col-span-3">
        {{ profile.linkedInProfileName }} &nbsp; (<NuxtLink
          :to="`https://www.linkedin.com/in/${profile.linkedInProfileName}`"
          target="_blank"
          >Try it <UIcon name="i-mdi-arrow-top-right" /></NuxtLink
        >)
      </span>
    </div>
    <div class="mb-4 grid grid-cols-4">
      <span class="label">Last updated</span>
      <span class="col-span-3">{{ formatToDateTime(profile.updatedAt) }}</span>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
import { format } from 'date-fns'

const profile = useUserStore().profile

const formatToDate = (ts) => {
  console.log('formatToDate', ts)
  if (ts === '') {
    return ''
  }
  return format(new Date(ts), 'd MMMM yyyy')
}
const formatToDateTime = (ts) => {
  console.log('formatToDateTime', ts)
  if (ts === '') {
    return ''
  }
  return format(new Date(ts), "d MMMM yyyy 'at' hh:mm b")
}
</script>

<style scoped>
.label {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-right: 3rem;
  text-align: right;
}
</style>
