<template>
  <UCard>
    <template #header>
      <div class="text-2xl">Sign in using another service</div>
    </template>
    <UButton
      icon="i-mdi-github"
      size="lg"
      variant="solid"
      label="GitHub"
      @click="signIn('github')"
    />
    <UButton
      icon="i-mdi-google"
      size="lg"
      variant="solid"
      label="Google"
      @click="signIn('google')"
    />
  </UCard>
</template>

<script setup lang="ts">
const emit = defineEmits(['finish'])
const supabase = useSupabaseClient()

async function signIn(provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  })
  emit('finish')
}
</script>

<style lang="scss" scoped></style>
