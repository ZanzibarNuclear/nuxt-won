<!-- The code below includes your Project ID (P2emsXa7ut3UNIocHtXFrwUjyId6) -->
<!-- login.vue -->
<template>
  <div>
    <div v-if="isSessionLoading || isUserLoading">Loading ...</div>
    <div v-else-if="isAuthenticated">
      <div>Hello {{ user?.name }}</div>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>You are not logged in</div>
  </div>
</template>
<script lang="ts">
import { useDescope, useSession, useUser } from '@descope/vue-sdk'

const { isAuthenticated, isSessionLoading } = useSession()
const { user, isUserLoading } = useUser()
const { logout } = useDescope()

// import { createApp } from 'vue'
// import descope from '@descope/vue-sdk'

// // const config = useRuntimeConfig()

// const handleError = (e) => {
//   console.log('Error!', e)
// }

// const handleSuccess = (e) => {
//   console.log(e.detail.user.name)
//   console.log(e.detail.user.email)
// }

// const app = useNuxtApp().vueApp
// app.use(descope, {
//   projectId: 'P2emsXa7ut3UNIocHtXFrwUjyId6',
//   baseUrl: 'http://localhost:3000',
//   sessionTokenViaCookie: true,
// })
</script>
