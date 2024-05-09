<template>
  <div class="m-2">
    <UButton v-if="!signedIn" @click="openAuthPanel" variant="ghost">
      <UIcon name="i-mdi-login" class="big-icon" /> Sign In
    </UButton>
    <UDropdown
      v-if="signedIn"
      :items="items"
      :popper="{ placement: 'bottom-start' }"
      class="text-primary"
      ><UButton
        color="white"
        :label="screenName"
        trailing-icon="i-heroicons-chevron-down-20-solid"
    /></UDropdown>
    <UModal v-model="authPanelIsOpen">
      <AuthMagicLinkCard @finish="closeAuthPanel" />
      <AuthOAuthCard @finish="closeAuthPanel" />
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
const { profile, fetchAndLoadProfile } = useUserStore()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const signedIn = ref(false)
const authPanelIsOpen = ref(false)

const openAuthPanel = () => {
  authPanelIsOpen.value = true
}
const closeAuthPanel = () => {
  authPanelIsOpen.value = false
}

const screenName = computed(() => {
  return profile?.screen_name || user.value?.email || 'VIP'
})

onMounted(async () => {
  signedIn.value = !!user.value
  if (signedIn.value) {
    await fetchAndLoadProfile()
  }
})

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
        await supabase.auth.signOut()
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
</style>
