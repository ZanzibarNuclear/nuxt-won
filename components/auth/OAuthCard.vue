<template>
  <UCard class="shadow-cherenkov bg-nuclear-50">
    <div class="space-x-2 space-y-4 text-center">
      <UButton
        icon="i-ph-google-logo-duotone"
        size="lg"
        variant="outline"
        label="Google"
        class="hover:bg-nuclear-100"
        @click="signIn('google')"
      />
      <UButton
        icon="i-ph-x-logo-duotone"
        size="lg"
        variant="outline"
        label="X / Twitter"
        class="hover:bg-nuclear-100"
        @click="signIn('x')"
      />
      <UButton
        icon="i-ph-github-logo-duotone"
        size="lg"
        variant="outline"
        label="GitHub"
        class="hover:bg-nuclear-100"
        @click="signIn('github')"
      />
      <UButton
        icon="i-ph-discord-logo-duotone"
        size="lg"
        variant="outline"
        label="Discord"
        class="hover:bg-nuclear-100"
        @click="signIn('discord')"
      />
      <UButton
        icon="i-ph-apple-logo-duotone"
        size="lg"
        variant="outline"
        label="Apple"
        class="hover:bg-nuclear-100"
        @click="signIn('apple')"
      />
      <UButton
        icon="i-ph-instagram-logo-duotone"
        size="lg"
        variant="outline"
        label="Instagram"
        class="hover:bg-nuclear-100"
        @click="signIn('instagram')"
      />
      <UButton
        icon="i-ph-linkedin-logo-duotone"
        size="lg"
        variant="outline"
        label="LinkedIn"
        class="hover:bg-nuclear-100"
        @click="signIn('linkedin')"
      />
    </div>
    <template #footer>
      <div class="text-sm">
        You may be asked to authorize
        <span class="font-bold italic">Zanzibar's World of Nuclear Energy</span>. Say "yes" to join.
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const emit = defineEmits(['finish'])

async function signIn(provider: string) {
  useWonAuth().loginWithOAuth(provider)
  emit('finish')
}
</script>

<style lang="scss" scoped></style>
