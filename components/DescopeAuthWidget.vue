<!-- The code below includes your Project ID (P2emsXa7ut3UNIocHtXFrwUjyId6) -->
<!-- login.vue -->
<template>
  <Descope
    :flowId="sign-up-or-in"
    @error="handleError"
    @success="handleSuccess"
  />
</template>
<script setup>
const config = useRuntimeConfig()

const handleError = (e) => {
	console.log("Error!", e);
};

const handleSuccess = (e) => {
	console.log(e.detail.user.name);
	console.log(e.detail.user.email);
};

<!-- main.ts -->
import { createApp } from 'vue';

const app = createApp(App);
app.use(descope, {
	projectId: config.public.DESCOPE_PROJECT_ID,
	baseUrl: config.public.BASE_URL,
	sessionTokenViaCookie: true
});
</script>
