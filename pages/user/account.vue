<template>
  <div class="text-2xl font-bold text-primary">Profile and Settings</div>
  <div class="my-8">
    <div v-if="isEdit">
      <UButton @click="toggleEdit" icon="i-mdi-cancel" class="mb-6">
        Cancel
      </UButton>
      <UserProfileForm @save-changes="handleSave" />
    </div>
    <div v-else>
      <UButton @click="toggleEdit" icon="i-mdi-edit" class="mb-6">Edit</UButton>
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
