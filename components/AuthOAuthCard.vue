<template>
  <UCard>
    <template #header>
      <h2>Sign in using your account on any of these services.</h2>
      <div>You will be asked to share public profile information with us.</div>
    </template>
    <UButton
      icon="i-mdi-github"
      size="lg"
      variant="outline"
      label="GitHub"
      class="mx-1"
      @click="signIn('github')"
    />
    <UButton
      icon="i-mdi-google"
      size="lg"
      variant="outline"
      label="Google"
      class="mx-1"
      @click="signIn('google')"
    />
    <UButton
      icon="i-ri-twitter-x-line"
      size="lg"
      variant="outline"
      label="X / Twitter"
      class="mx-1"
      @click="signIn('twitter')"
    />
  </UCard>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const emit = defineEmits(['finish'])
const supabase = useSupabaseClient()

async function signIn(provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${config.baseUrl}/auth/confirm`,
    },
  })
  emit('finish')
}
</script>

<style lang="scss" scoped></style>
