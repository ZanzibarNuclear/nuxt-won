<template>
  <h3>Of what shall we speak?</h3>
  <div class="my-6">
    <wsy-topic-form class="my-6" @open-topic="handleOpenTopic" />
    <wsy-topic-select class="my-6" @open-topic="handleOpenTopic" />
  </div>
</template>

<script setup lang="ts">
const handleOpenTopic = async (topicKey: string) => {
  navigateTo(`/wsy/threads/${topicKey}`)
}
</script>

<style lang="scss" scoped></style>
