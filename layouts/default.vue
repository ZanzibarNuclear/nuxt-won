<template>
  <UContainer>
    <header>
      <UButton square variant="ghost" to="/">
        <template #leading>
          <UAvatar src="/images/Zanzibar.svg" size="md" />
        </template>
      </UButton>
      <span class="px-5 text-2xl">Zanzibar's World of Nuclear</span>
    </header>
    <div class="flex gap-x-5">
      <div class="flex-col">
        <feature-menu />
      </div>
      <div class="flex-col w-full px-4 py-4">
        <slot />
      </div>
    </div>
    <footer>&copy; Copyright 2024, The Nuclear Stack, LLC.</footer>
  </UContainer>
</template>

<style scoped>
header {
  margin-top: 1rem;
  margin-bottom: 3rem;
}
footer {
  margin-top: 5rem;
  margin-bottom: 1rem;
}
</style>
