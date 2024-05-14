<template>
  <div>You are responding to an invitation. Great.</div>
  <div>
    The World of Nuclear Energy is a lot of fun to explore. You will get smarter
    just by reading everything this site offers.
  </div>
  <div>
    You are being invited to see this...(TODO: show the link to the WSY topic).
    When you are ready, click it and go there.
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
  <div>
    Have a look around. Everything you see if free. You might want to sign up
    for a free account when you want to participate in one or our activities,
    like <em>What Say You?</em> or <em>Nuclear Simulations</em>.
  </div>
</template>

<script setup lang="ts">
const url = useRequestURL()

const action = ref()
const referral_code = ref()

const isDecline = computed(() => {
  return action.value === 'decline'
})
const isAccept = computed(() => {
  return action.value === 'accept'
})

onBeforeMount(async () => {
  // register whether request is to accept or decline invitation
  // in any case, even for unknown actions, we want to show this marketing page

  referral_code.value = url.searchParams.get('referral_code')
  action.value = url.searchParams.get('action')

  if (action.value !== 'accept' && action.value !== 'decline') {
    console.error('unknown action - do nothing')
    return
  }

  await $fetch(`/api/invitations/${action.value}`, {
    method: 'POST',
    body: {
      referral_code,
    },
  })

  // TODO: retrieve the invitation and say something about the target
})
</script>

<style scoped></style>
