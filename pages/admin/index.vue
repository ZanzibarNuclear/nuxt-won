<template>
  <div>
    <h1>Admin Insights</h1>
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
        <template #feedback="{ item }">
          <admin-feedback-viewer />
        </template>
      </UTabs>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['admin-route-guard'],
})
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
  {
    label: 'Feedback',
    slot: 'feedback',
  },
]
</script>
