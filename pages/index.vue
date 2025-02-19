<script setup>
import { EventRepository as eventRepo } from '~/api/wonService/EventRepo'
definePageMeta({
  layout: 'entrance',
})

onMounted(() => {
  eventRepo.logPageHit('opener')
})
</script>

<template>
  <div>
    <Opener />
  </div>
</template>
