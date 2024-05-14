<template>
  <UContainer class="w-3/4">
    <h1>Someone invited you...and here you are!</h1>
    <div v-if="isAccept" class="my-6">
      I see that you are accepting the invitation to check out Zanzibar's World
      of Nuclear Energy. Fantastic. You are going to love this experience, and
      you will learn a lot. Maybe you will even make some friends for life.
    </div>
    <div v-if="isDecline" class="my-6">
      I see that you are declining the invitation to check out Zanzibar's World
      of Nuclear Energy. That's okay. We have made a record of that, and we will
      not send you any more email. After all, affordable energy is not for
      everyone.
    </div>
    <div v-if="serviceInfo" class="my-6">
      You are being invited to {{ serviceInfo.serviceName }}, which is
      {{ serviceInfo.briefDescription }}. When you are ready,
      <NuxtLink :to="`${serviceInfo.urlPath}?topic=${target.topicKey}`"
        >go there</NuxtLink
      >. You may need to create an account or sign in first.
    </div>
    <div class="my-6">
      Zanzibar's World of Nuclear Energy is a lot of fun to explore. You will
      get smarter just by reading everything this site offers. Have a look
      around. Everything you see if free. You might want to sign up for a free
      account when you want to participate in one or our activities, like
      <em>What Say You?</em> or <em>Nuclear Simulations</em>.
    </div>
  </UContainer>
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
const serviceDecoder = {
  wsy: {
    serviceName: 'What Say You?',
    briefDescription: 'a discussion forum for ideas about nuclear energy',
    urlPath: '/wsy',
  },
}
const serviceInfo = computed(() => {
  if (target.value?.service) {
    return serviceDecoder[target.value.service]
  } else {
    return null
  }
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
