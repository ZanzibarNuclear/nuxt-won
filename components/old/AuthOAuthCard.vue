<template>
  <UCard>
    <template #header>
      <h2>Use your account on one of these services.</h2>
      <div>You will be asked to share public profile information with us.</div>
    </template>
    <UButton
      icon="i-ph-google-logo"
      size="lg"
      variant="outline"
      label="Google"
      class="mx-1"
      @click="signIn('google')"
    />
    <UButton
      icon="i-ph-x-logo"
      size="lg"
      variant="outline"
      label="X / Twitter"
      class="mx-1"
      @click="signIn('twitter')"
    />
    <UButton
      icon="i-ph-github-logo"
      size="lg"
      variant="outline"
      label="GitHub"
      class="mx-1"
      @click="signIn('github')"
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
