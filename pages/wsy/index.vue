<template>
  <div>
    <h1>What Say You?</h1>
    <div v-if="!viewHeader">
      <UButton
        @click="viewHeader = true"
        icon="i-ph-eye"
        :label="userContext.player.alias || 'Who are you?'"
      />
    </div>
    <div v-else>
      <wsy-header :player="userContext.player" @close="closeHeader" />
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
</script>
