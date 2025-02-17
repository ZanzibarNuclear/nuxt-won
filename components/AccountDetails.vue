<script setup>
const won = useWonService()
const wonAuth = useWonAuth()
const userStore = useUserStore()

const username = ref('')
const website = ref('')
const avatarUrl = ref('')
const loading = ref(false)

if (userStore.isSignedIn) {
  loading.value = true
  const user = userStore.user
  const profile = await won.get('/profiles/' + user.id)
  if (profile) {
    username.value = profile.username
    website.value = profile.website
    avatarUrl.value = profile.avatarUrl
  }
  loading.value = false
}

async function updateProfile() {
  try {
    loading.value = true
    const user = userStore().user
    const updates = {
      username: username.value,
      website: website.value,
      avatarUrl: avatarUrl.value,
    }
    await won.put('/profiles/' + user.id, updates)
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    loading.value = true
    await wonAuth.signOut()
    userStore.clearUser()
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="user.email" disabled />
    </div>
    <div>
      <label for="username">Username</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" type="url" v-model="website" />
    </div>

    <div>
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button class="button block" @click="signOut" :disabled="loading">Sign Out</button>
    </div>
  </form>
</template>
