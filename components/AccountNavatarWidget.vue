<template>
  <div class="m-2">
    <UButton v-if="!signedIn" @click="handleSignIn" variant="ghost">
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
    <UModal v-model="authPanelIsOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header> Sign In or Join </template>

        <UForm>
          <div>username</div>
          <div>password</div>
          <button>Sign In</button>
        </UForm>

        <template #footer> Cancel </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
const signedIn = ref(false)
const handleSignIn = () => {
  signedIn.value = !signedIn.value
  authPanelIsOpen.value = true
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
