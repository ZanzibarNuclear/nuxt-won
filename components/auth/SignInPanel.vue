<template>
  <div class="m-12">
    <h2>Sign In / Join</h2>
    <div class="pb-2 font-body text-heroic-black dark:text-heroic-lightgray">
      Please identify yourself using one of these methods.
    </div>
    <div class="space-y-6">
      <!-- <AuthModalOAuthPanel /> -->
      <AuthOAuthCard />
      <UDivider>or</UDivider>
      <AuthMagicLinkCard />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
