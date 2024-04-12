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
        :label="user?.email || 'Mystery VIP'"
        trailing-icon="i-heroicons-chevron-down-20-solid"
    /></UDropdown>
    <UModal v-model="authPanelIsOpen">
      <AuthMagicLinkCard @finish="closeAuthPanel" />
      <AuthOAuthCard @finish="closeAuthPanel" />
    </UModal>
  </div>
</template>

<script setup lang="ts">
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

onMounted(() => {
  signedIn.value = !!user.value
})

const items = [
  [
    {
      label: 'Profile',
      icon: 'i-mdi-card-account-details',
      to: '/user-settings',
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
