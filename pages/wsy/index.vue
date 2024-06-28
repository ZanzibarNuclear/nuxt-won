<template>
  <div>
    <h1>What Say You?</h1>
    <div v-if="!viewHeader && !viewFeedbackForm">
      <UButton
        @click="viewHeader = true"
        icon="i-ph-person"
        :label="userContext.player?.alias || 'Who are you?'"
      />
      <UButton
        @click="viewFeedbackForm = true"
        icon="i-ph-chat-centered-text"
        label="Give Feedback"
        class="ml-2"
      />
    </div>
    <div v-else-if="viewHeader">
      <wsy-header :player="userContext.player" @close="closeHeader" />
    </div>
    <div v-else-if="viewFeedbackForm">
      <feedback-form context="wsy" @feedback-delivered="closeFeedbackForm" />
    </div>
    <wsy-topic v-if="!!userContext.player" />
  </div>
</template>

<script setup lang="ts">
import { getParticipant } from '~/db/WsyModel'
import type { Participant } from '~/types/won-types'

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
    const { data: playerData } = await useAsyncData('participant', () =>
      getParticipant(userContext.user.id)
    )
    userContext.setPlayer(playerData.value as Participant)
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
