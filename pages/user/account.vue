<template>
  <div class="text-2xl font-bold text-primary">Profile and Settings</div>
  <div class="my-8">
    <div v-if="isEdit">
      <UButton @click="toggleEdit" icon="i-mdi-cancel" class="mb-6"
        >Cancel</UButton
      >
      <UserProfileForm />
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
console.log(`ID is ${user.user_id}`)
const fetchProfile = async (user_id) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user_id)
  return data
}

onBeforeMount(async () => {
  const data = await fetchProfile(user.id)
  console.log(data[0])
  userProfile.value = data[0]
  userStore.loadProfile(data[0])
})

const isEdit = ref(false)
const toggleEdit = () => {
  isEdit.value = !isEdit.value
}
</script>

<style lang="scss" scoped></style>
