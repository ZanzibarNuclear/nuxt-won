<template>
  <div class="widget-bump">
    <div v-if="!signedIn">
      <div>
        <UButton label="Sign In" variant="solid" color="primary" icon="i-ph-sign-in" @click="openAuthPanel" />
      </div>
    </div>
    <UDropdown v-if="signedIn" :items="items" :popper="{ placement: 'bottom-start' }" class="text-primary">
      <UButton color="primary" variant="solid" icon="i-ph-person" :title="screenName"
        trailing-icon="i-ph-caret-double-down" />
    </UDropdown>
    <UModal v-model="authPanelIsOpen">
      <AuthOAuthCard @finish="closeAuthPanel" />
      <AuthMagicLinkCard @finish="closeAuthPanel" />
    </UModal>
    <UModal v-model="isFeedbackFormOpen">
      <feedback-form context="navatar" @feedback-delivered="handleFeedbackDelivered" />
    </UModal>
  </div>
</template>

<script setup lang="ts">
const userContext = useUserStore()

const signedIn = computed(() => !!userContext.user)
const screenName = computed(() => {
  return userContext.profile?.screen_name || 'VIP'
})

onMounted(async () => {
  userContext.loadUser()
  await userContext.fetchAndLoadProfile()
})

const openJoin = () => {
  navigateTo('/auth/sign-in')
}

const authPanelIsOpen = ref(false)
const openAuthPanel = () => {
  authPanelIsOpen.value = true
}
const closeAuthPanel = () => {
  authPanelIsOpen.value = false
}

const isFeedbackFormOpen = ref(false)
const onOpenFeedbackForm = () => (isFeedbackFormOpen.value = true)
const handleFeedbackDelivered = async () => {
  isFeedbackFormOpen.value = false
  alert('Got it. Thanks for the feedback.')
}

const items = [
  [
    {
      label: 'Profile',
      icon: 'i-ph-identification-card',
      to: '/user/account',
    },
    {
      label: 'Feedback',
      icon: 'i-ph-ear',
      click: () => onOpenFeedbackForm(),
    },
    {
      label: 'Sign Out',
      icon: 'i-ph-sign-out',
      click: async () => {
        await useSupabaseClient().auth.signOut()
        userContext.clearUser()
        navigateTo('/')
      },
    },
  ],
]
</script>

<style lang="scss" scoped>
.big-icon {
  font-size: 24px;
  margin-left: 2px;
}

/*
.widget-bump {
  position: relative;
  top: 85px;
}
  */
</style>
