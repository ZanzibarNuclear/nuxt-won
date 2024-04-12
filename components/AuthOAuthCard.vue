<template>
  <UCard>
    <template #header>
      <div class="text-2xl">Sign in using another service</div>
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
