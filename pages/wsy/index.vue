<script setup lang="ts">
const wsy = useWsyStore()
</script>

<template>
  <div>
    <h1>What Say You?</h1>
    <WhatSayYouHeader />
    <WhatSayYouTopic v-if="wsy.isPlayerLoaded" />
    <WhatSayYouEntries v-if="wsy.isActiveThread" />
  </div>
</template>
