<template>
  <UContainer>
    <header>
      <div class="flex flex-center">
        <UButton square variant="ghost" to="/">
          <template #leading>
            <UAvatar src="/images/Zanzibar.svg" size="md" />
          </template>
        </UButton>
        <span class="title text-4xl">Zanzibar's World of Nuclear</span>
        <AccountNavatarWidget class="corner" />
      </div>
    </header>
    <div class="flex gap-x-5">
      <div class="flex-col">
        <feature-menu />
      </div>
      <div class="flex-col w-full px-4 py-4">
        <slot />
      </div>
    </div>
    <footer class="text-center">
      &copy; Copyright 2024, Nuclear Ambitions
    </footer>
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
.title {
  flex: 1;
  text-align: center;
}
.corner {
  margin-left: auto;
}
</style>
