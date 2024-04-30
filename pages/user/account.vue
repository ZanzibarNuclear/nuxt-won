<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
const { fetchAndLoadProfile, updateProfile } = useUserStore()

onBeforeMount(async () => {
  await fetchAndLoadProfile()
})

const handleSave = async (updates) => {
  await updateProfile(updates)
  isEdit.value = false
}

const isEdit = ref(false)

const toggleEdit = () => {
  isEdit.value = !isEdit.value
}
</script>

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
