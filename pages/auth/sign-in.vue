<template>
  <div>
    <h1>Sign In or Join</h1>
    <div>
      Use one of these methods to establish your identity. In any case, we will create your World of
      Nuclear account if you need one.
    </div>
    <AuthOAuthCard class="my-6" />
    <AuthMagicLinkCard class="my-6" />
    <div class="my-12">
      <h3>Why do I need to sign in?</h3>
      <div class="text-md my-4">
        Signing in helps us know that it's you. More importantly, it helps us keep track of your
        experiences. If you want access to members-only areas (where the really good stuff is), you
        need to sign in.
      </div>
      <div class="text-md my-4">
        Membership is free. When you join, we give you an account, which is where we store your
        profile and user preferences. Plus, your account is used to keep track of your participation
        in World of Nuclear, like knowing which lessons you have taken.
      </div>
      <h3>Legal Stuff</h3>
      <div class="text-md my-4">
        Here are our
        <NuxtLink to="https://nuclearambitions.com/legal/terms-of-use" target="_blank"
          >terms of use</NuxtLink
        >. Signing up means you agree with these terms. Also, you can read our
        <NuxtLink to="https://nuclearambitions.com/legal/privacy-policy" target="_blank"
          >privacy policy</NuxtLink
        >, in case you are worried about that.
        <div class="text-md my-4">
          By the way, we use cookies, like every other website. Again, it's how we know that it's
          you while you click around the website. We are not selling your cookie data or telling
          other companies about your favorite reactor designs.
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

<style scoped>
a {
  @apply text-heroic-cherenkov hover:text-nuclear-600;
}
</style>
