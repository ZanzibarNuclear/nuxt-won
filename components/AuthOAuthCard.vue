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
      @click="signInWithGithub"
    />
  </UCard>
</template>

<script setup lang="ts">
const emit = defineEmits(['finish'])
const supabase = useSupabaseClient()

async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  })
  emit('finish')
}
</script>

<style lang="scss" scoped></style>
