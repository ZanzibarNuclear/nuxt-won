<template>
  <div>
    <h1>What Say You?</h1>
    <div v-if="!viewPlayerCard && !viewFeedbackForm">
      <UButton
        variant="solid"
        @click="viewPlayerCard = true"
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
    <div v-else-if="viewPlayerCard">
      <wsy-player-card
        :player="userContext.wsyWriter"
        @close="closePlayerCard"
      />
    </div>
    <div v-else-if="viewFeedbackForm">
      <feedback-form context="wsy" @feedback-delivered="closeFeedbackForm" />
    </div>
    <wsy-topic v-if="!!userContext.wsyWriter" />
  </div>
</template>

<script setup lang="ts">
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
const wsyStore = useWsyStore()

const viewPlayerCard = ref(false)
const viewFeedbackForm = ref(false)

async function getData() {
  userContext.loadUser()
  if (userContext.user) {
    let player = wsyStore.lookupWriter(userContext.user.id)
    if (!player) {
      const { data: playerData } = await useAsyncData('wsyPlayer', () =>
        $fetch(`/api/say/writers/${userContext.user.id}`)
      )
      console.log('had to fetch player info', playerData.value)
      player = playerData.value
    }
    userContext.setWsyWriter(player)
  } else {
    console.log('You need to join or sign in.')
  }
}
await getData()

const closePlayerCard = () => {
  viewPlayerCard.value = false
}
const closeFeedbackForm = () => {
  viewFeedbackForm.value = false
  alert('Thanks for the feedback.')
}
</script>
