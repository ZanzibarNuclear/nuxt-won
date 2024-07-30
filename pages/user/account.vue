<template>
  <h1>Profile and Settings</h1>
  <div class="my-8">
    <div v-if="isEdit">
      <UButton @click="toggleEdit" icon="i-ph-pencil-slash" class="mb-6">
        Cancel
      </UButton>
      <UserProfileForm @save-changes="handleSave" />
    </div>
    <div v-else>
      <UButton @click="toggleEdit" icon="i-ph-pencil-duotone" class="mb-6"
        >Edit</UButton
      >
      <UserProfileView />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserProfile } from '~/types/won-types'

useSeoMeta({
  title: 'World of Nuclear - Member Account',
  ogTitle: 'World of Nuclear - Member Account',
  description: 'Update your profile and preferences.',
  ogDescription: 'Update your profile and preferences.',
})

const { fetchAndLoadProfile, updateProfile } = useUserStore()

onBeforeMount(async () => {
  await fetchAndLoadProfile()
})

const handleSave = async (deltas: UserProfile) => {
  await updateProfile(deltas)
  isEdit.value = false
}

const isEdit = ref(false)
const toggleEdit = () => {
  isEdit.value = !isEdit.value
}
</script>
