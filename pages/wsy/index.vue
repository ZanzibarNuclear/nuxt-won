<template>
  <div>
    <h1>What Say You?</h1>
    <div v-if="!viewHeader && !viewFeedbackForm">
      <UButton
        @click="viewHeader = true"
        icon="i-ph-person"
        :label="userContext.wsyWriter?.penName || 'Who are you?'"
      />
      <UButton
        @click="viewFeedbackForm = true"
        icon="i-ph-chat-centered-text"
        label="Give Feedback"
        class="ml-2"
      />
    </div>
    <div v-else-if="viewHeader">
      <wsy-header :player="userContext.wsyWriter" @close="closeHeader" />
    </div>
    <div v-else-if="viewFeedbackForm">
      <feedback-form context="wsy" @feedback-delivered="closeFeedbackForm" />
    </div>
    <wsy-topic v-if="!!userContext.wsyWriter" />
  </div>
</template>

<script setup lang="ts">
import { getWriter } from '~/db/WhatSayYouModel'
import type { WsyWriter } from '~/types/won-types'

useSeoMeta({
  title: 'World of Nuclear - What Say You?',
  ogTitle: 'World of Nuclear - What Say You?',
  description:
    'Discussion forum to talk about beneficial aspects of nuclear energy. Read what others have to say, and respond with your own ideas.',
  ogDescription:
    'Discussion forum to talk about beneficial aspects of nuclear energy. Read what others have to say, and respond with your own ideas.',
  ogImage: 'https://worldofnuclear.com/speech-bubbles.png',
  twitterCard: 'summary',
})

const userContext = useUserStore()
const viewHeader = ref(false)
const viewFeedbackForm = ref(false)

async function getData() {
  userContext.loadUser()
  if (userContext.user) {
    const { data: playerData } = await useAsyncData('wsyPlayer', () =>
      getWriter(userContext.user.id)
    )
    userContext.setWsyWriter(playerData.value as WsyWriter)
    console.log('player', playerData.value)
  } else {
    console.log('You need to join or sign in.')
  }
}
await getData()

const closeHeader = () => {
  viewHeader.value = false
}
const closeFeedbackForm = () => {
  viewFeedbackForm.value = false
  alert('Thanks for the feedback.')
}
</script>
