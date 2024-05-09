<script setup lang="ts">
const wsy = useWsyStore()

defineProps(['entries', 'indent'])
</script>

<template>
  <WhatSayYouEntryForm />
  <WsyViewRecursive :entries="wsy.topLevelEntries" :indent="0" />
</template>
