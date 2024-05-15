<template>
  <div>
    <h1>Sign In or Sign Up</h1>
    <AuthMagicLinkCard class="my-6" />
    <AuthOAuthCard class="my-6" />
    <div class="my-12">
      <h3>Why do I need to sign in?</h3>
      <div class="text-md my-4">
        If you want access to members-only areas (where the really good stuff
        is), you need to sign in. Signing in helps us know that it's you. More
        importantly, it helps us keep track of your experiences.
      </div>
      <div class="text-md my-4">
        If you need an account, you can create one for free. Your account is
        where we store your profile and user preferences. Plus, your account is
        used to keep track of your experiences in World of Nuclear. We call that
        your "user history."
      </div>
      <h3>Legal Stuff</h3>
      <div class="text-md my-4">
        Here are our
        <NuxtLink
          to="https://nuclearambitions.com/legal/terms-of-use"
          target="_blank"
          >terms of use</NuxtLink
        >. Signing up means you agree with these terms. Also, you can read our
        <NuxtLink
          to="https://nuclearambitions.com/legal/privacy-policy"
          target="_blank"
          >privacy policy</NuxtLink
        >, in case you are worried about that.
        <div class="text-md my-4">
          By the way, we use cookies, like every other website. Again, it's how
          we know that it's you while you click around the website.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'World of Nuclear - Sign In or Sign Up',
  ogTitle: 'World of Nuclear - Sign In or Sign Up',
  description:
    "Join Zanzibar's World of Nuclear, a safe place to explore the beneficial uses of nuclear energy. Consume our bite-sized lessons, join in interactive discussions, and operate nuclear simulations. Find out about unlimited power.",
  ogDescription:
    "Join Zanzibar's World of Nuclear, a safe place to explore the beneficial uses of nuclear energy. Consume our bite-sized lessons, join in interactive discussions, and operate nuclear simulations. Find out about unlimited power.",
})
</script>

<style scoped></style>
