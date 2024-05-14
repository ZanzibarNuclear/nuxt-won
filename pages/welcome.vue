<template>
  <div>You are responding to an invitation. Great.</div>
  <div>
    The World of Nuclear Energy is a lot of fun to explore. You will get smarter
    just by reading everything this site offers.
  </div>
  <div v-if="isAccept">
    I see that you are accepting the invitation to join. Fantastic. You are
    going to love this experience, and you will learn a lot. Maybe you will even
    make some friends for life.
  </div>
  <div v-if="isDecline">
    I see that you are declining the invitation to join. We have made a record
    of that, and we will not send you any more email.
  </div>
  <div v-if="target">
    You are being invited to {{ target.service }} to see this topic
    {{ target.topicKey }}. When you are ready,
    <NuxtLink :to="`/wsy?topic=${target.topicKey}`">go there</NuxtLink>. You may
    need to create an account or sign in first.
  </div>
  <div>
    Have a look around. Everything you see if free. You might want to sign up
    for a free account when you want to participate in one or our activities,
    like <em>What Say You?</em> or <em>Nuclear Simulations</em>.
  </div>
</template>

<script setup lang="ts">
const url = useRequestURL()

const action = ref()
const referralCode = ref()
const target = ref()

const isDecline = computed(() => {
  return action.value === 'decline'
})
const isAccept = computed(() => {
  return action.value === 'accept'
})

onMounted(async () => {
  // register whether request is to accept or decline invitation
  // in any case, even for unknown actions, we want to show this marketing page

  referralCode.value = url.searchParams.get('referral_code')
  action.value = url.searchParams.get('action')

  if (action.value !== 'accept' && action.value !== 'decline') {
    console.warn('unknown action - do nothing')
    return
  }

  if (!referralCode.value) {
    console.warn('no referral code found')
    return
  }

  const invitation = await $fetch(`/api/invitations/${action.value}`, {
    method: 'POST',
    body: {
      referralCode: referralCode.value,
    },
  })
  target.value = JSON.parse(invitation.target)
})
</script>

<style scoped></style>
