<template>
  <div class="m-2">
    <UButton v-if="!signedIn" @click="handlePresentSignIn" variant="ghost">
      <UIcon name="i-mdi-login" class="big-icon" /> Sign In
    </UButton>
    <UDropdown
      v-if="signedIn"
      :items="items"
      :popper="{ placement: 'bottom-start' }"
      class="text-primary"
      ><UButton
        color="white"
        label="Bubba"
        trailing-icon="i-heroicons-chevron-down-20-solid"
    /></UDropdown>
    <UModal v-model="authPanelIsOpen" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <UCheckbox
            v-model="isJoin"
            name="join"
            label="Join World of Nuclear"
          />
        </template>

        <UForm>
          <div>username</div>
          <div>password</div>
          <UButton v-if="isJoin" @click="handleSignUp">Sign Me Up!</UButton>
          <UButton v-else @click="handleSignIn">Sign In</UButton>
        </UForm>

        <template #footer>
          <UButton @click="handleCancel">
            <UIcon name="i-mdi-cancel" class="big-icon" /> Cancel
          </UButton>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
const isJoin = ref(false)
const signedIn = ref(false)
const handlePresentSignIn = () => {
  authPanelIsOpen.value = true
}
const handleSignIn = () => {
  signedIn.value = true
  authPanelIsOpen.value = false
}
const handleSignUp = () => {
  alert('Joining World of Nuclear...get excited.')
  signedIn.value = true
  isJoin.value = false
  authPanelIsOpen.value = false
}
const handleCancel = () => {
  authPanelIsOpen.value = false
}
const authPanelIsOpen = ref(false)

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
      click: () => {
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
