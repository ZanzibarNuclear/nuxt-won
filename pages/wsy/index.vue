<script setup lang="ts">
const wsy = useWsyStore()
</script>

<template>
  <div>
    <WhatSayYouHeader />
    <WhatSayYouTopic v-if="wsy.isPlayerLoaded" />
    <WhatSayYouEntries v-if="wsy.isActiveThread" />
  </div>
</template>
