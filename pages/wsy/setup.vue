<script setup lang="ts">
let user = 'wait..'
const alias = ref('')
const { data: participants } = await useFetch('/api/participants')

const isRegistered = computed(() => {
  return participants.length > 0
})

const register = async () => {
  user = useSupabaseUser()
  console.log('user ID: ' + user.id)
  const body = await $fetch('/api/participants', {
    method: 'post',
    body: { user_id: user.id, alias: alias.value },
  })
  console.log(body)
}
</script>

<template>
  <div>
    <h2>Set up What Say You</h2>
    <div>Logged in: {{ user?.id }}</div>
    <ul>
      <li v-for="player in participants">
        {{ player.alias }} ({{ player.id }})
      </li>
    </ul>
    <div>Is <span v-if="!isRegistered">not</span> registered.</div>
  </div>
  <div>
    <h2>Name Yourself</h2>
    <UFormGroup
      label="Alias"
      description="The name associated with your comments"
    >
      <UInput v-model="alias" />
    </UFormGroup>
    <UButton @click="register">Register</UButton>
  </div>
</template>
