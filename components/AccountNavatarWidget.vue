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

        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="state.password"
              type="password"
              autocomplete="off"
            />
          </UFormGroup>

          <UButton type="submit">
            {{ isJoin ? 'Sign Me Up!' : 'Sign In' }}
          </UButton>
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

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
  if (isJoin.value) {
    handleSignUp()
  } else {
    handleSignIn()
  }
}

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
