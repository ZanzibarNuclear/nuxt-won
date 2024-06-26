<template>
  <div class="widget-bump">
    <div v-if="!signedIn">
      <UButton
        label="Join"
        to="/auth/sign-in"
        variant="solid"
        color="amber"
        icon="i-ph-arrow-bend-down-right-duotone"
        class="mr-2"
      />
      <UButton
        @click="openAuthPanel"
        variant="solid"
        color="primary"
        icon="i-ph-sign-in"
        label="Sign In"
      />
    </div>
    <UDropdown
      v-if="signedIn"
      :items="items"
      :popper="{ placement: 'bottom-start' }"
      class="text-primary"
      ><UButton
        color="green"
        variant="solid"
        icon="i-ph-person"
        :label="screenName"
        trailing-icon="i-heroicons-chevron-down-20-solid"
    /></UDropdown>
    <UModal v-model="authPanelIsOpen">
      <AuthOAuthCard @finish="closeAuthPanel" />
      <AuthMagicLinkCard @finish="closeAuthPanel" />
    </UModal>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()

const signedIn = computed(() => !!userStore.user)
const screenName = computed(() => {
  return userStore.profile?.screen_name || userStore.user?.email || 'VIP'
})

onMounted(async () => {
  userStore.loadUser()
  await userStore.fetchAndLoadProfile()
})

const authPanelIsOpen = ref(false)
const openAuthPanel = () => {
  authPanelIsOpen.value = true
}
const closeAuthPanel = () => {
  authPanelIsOpen.value = false
}

const items = [
  [
    {
      label: 'Profile',
      icon: 'i-mdi-card-account-details',
      to: '/user/account',
    },
    {
      label: 'Sign Out',
      icon: 'i-mdi-logout',
      click: async () => {
        await useSupabaseClient().auth.signOut()
        signedIn.value = false
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
.widget-bump {
  position: relative;
  top: 80px;
}
</style>
