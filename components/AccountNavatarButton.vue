<template>
  <div class="m-2">
    <UButton v-if="!signedIn" @click="toggleSignedIn" variant="solid">
      <UIcon name="i-mdi-login" class="big-icon" />
    </UButton>
    <UDropdown
      v-if="signedIn"
      :items="items"
      :popper="{ placement: 'bottom-start' }"
      ><UButton
        color="white"
        label="Bubba"
        trailing-icon="i-heroicons-chevron-down-20-solid"
    /></UDropdown>
  </div>
</template>

<script setup>
const signedIn = ref(false)
const toggleSignedIn = () => {
  signedIn.value = !signedIn.value
}
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
        toggleSignedIn()
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
