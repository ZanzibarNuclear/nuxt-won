<template>
  <UContainer class="mt-16">
    <h1>Admin Insights</h1>
    <!-- <div>
      <NuxtLink to="/admin/invitations">Invitations</NuxtLink>
    </div>
    <div>
      <NuxtLink to="/admin/users">Members</NuxtLink>
    </div> -->
    <div class="my-8">
      <UTabs :items="sections" class="w-full">
        <template #members="{ item }">
          <admin-member-viewer />
        </template>
        <template #invitations="{ item }">
          <admin-invitation-viewer />
        </template>
        <template #events="{ item }">
          <admin-event-viewer />
        </template>
      </UTabs>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const sections = [
  {
    label: 'Members',
    slot: 'members',
  },
  {
    label: 'Invitations',
    slot: 'invitations',
  },
  {
    label: 'Events',
    slot: 'events',
  },
]
</script>
