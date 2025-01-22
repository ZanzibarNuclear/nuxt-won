<template>
  <div>
    <h1>Someone invited you...and here you are!</h1>
    <div class="my-6">
      You are being invited to
      <span class="font-bold italic">{{ serviceInfo.serviceName }}</span
      >, which is {{ serviceInfo.briefDescription }}. When you are ready,
      <NuxtLink :to="serviceInfo.urlPath">go there</NuxtLink>. You may need to
      create an account or sign in first.
    </div>
    <div v-if="isAccept" class="my-6">
      I see that you are accepting the invitation. Fantastic. You are going to
      love this experience, and you will learn a lot. Maybe you will even make
      some friends for life.
    </div>
    <div v-if="isDecline" class="my-6">
      I see that you are declining the invitation. That's okay. We have made a
      record of that, and we will not send you any more email. After all,
      affordable, clean energy is not for everyone, right? (Haha, just kidding.)
    </div>
    <div class="my-6">
      Zanzibar's World of Nuclear Energy is a lot of fun to explore. You will
      get smarter just by reading everything this site offers. Have a look
      around. Everything you see if free. You might want to sign up for a free
      account when you want to participate in one or our activities, like
      <em>What Say You?</em> or <em>Nuclear Simulators</em>.
    </div>
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

const serviceInfo = computed(() => {
  switch (target.value?.service) {
    case 'wsy':
      return {
        serviceName: 'What Say You?',
        briefDescription: 'a discussion forum for ideas about nuclear energy',
        urlPath: `/wsy/threads/${target.value.topicKey}`,
      }
    default:
      return {
        serviceName: 'World of Nuclear',
        briefDescription:
          'a digital platform to support the beneficial use of nuclear energy',
        urlPath: `/`,
      }
  }
})

referralCode.value = url.searchParams.get('referral_code')
action.value = url.searchParams.get('action')

if (action.value !== 'accept' && action.value !== 'decline') {
  console.warn('unknown action - do nothing')
} else if (!referralCode.value) {
  console.warn('no referral code found')
} else {
  const { data: invitation, error } = await useFetch(
    `/api/invitations/${action.value}`,
    {
      method: 'POST',
      body: {
        referralCode: referralCode.value,
      },
    }
  )
  const updated = invitation.value
  target.value = JSON.parse(updated.target)
}
</script>

<style scoped></style>
