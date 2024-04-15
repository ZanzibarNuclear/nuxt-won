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
import { useUserStore } from '~/stores/userStore'
const userStore = useUserStore()

const supabase = useSupabaseClient()
const user = useSupabaseUser().value

const fetchProfile = async (user_id) => {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', user_id)
  return data
}

onBeforeMount(async () => {
  const data = await fetchProfile(user.id)
  userStore.loadProfile(data[0])
})

const mapProfileChangesForUpdate = (update) => {
  const now = new Date().toISOString()
  console.log(now)
  return {
    screen_name: update.screenName,
    full_name: update.fullName,
    join_reason: update.joinReason,
    nuclear_likes: update.nuclearLikes,
    x_username: update.xUsername,
    linkedin_profile_name: update.linkedInProfileName,
    updated_at: now,
  }
}

const updateProfile = async (user_id, profileUpdates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(profileUpdates)
    .eq('id', user_id)
    .select()
  return data
}

const handleSave = async (updates) => {
  console.log('handleSave', updates)
  const prepped = mapProfileChangesForUpdate(updates)
  const data = await updateProfile(user.id, prepped)
  userStore.loadProfile(data[0])
  isEdit.value = false
}

const isEdit = ref(false)
const toggleEdit = () => {
  isEdit.value = !isEdit.value
}
</script>

<style lang="scss" scoped></style>
