<template>
  <div class="bg-heroic-uranium dark:bg-heroic-graphite text-heroic-graphite dark:text-heroic-lightgray">
    <div class="antialiased flex flex-col items-center justify-center min-h-screen place-content-center sm:text-base">
      <div class="min-w-80 w-5/6 mx-auto">
        <LayoutBasicHeader :hide-nav="true" />
        <UButton to="/lessons" icon="i-ph-book-open-text-duotone">Lessons</UButton>
        <main class="mb-16">
          <slot />
        </main>
        <LessonSelector />
        <LayoutBasicFooter />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const hideNav = ref(true)
const toggleLeftNavVisibility = () => {
  hideNav.value = !hideNav.value
}
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #f6f2eb;
}

/* Responsive design */
@media screen and (max-width: 600px) {
  header {
    flex-direction: column;
    align-items: flex-start;
  }

  .account {
    align-self: flex-end;
  }
}

footer {
  margin-top: 5rem;
  margin-bottom: 1rem;
}
</style>
