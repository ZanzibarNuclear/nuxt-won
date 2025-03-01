<template>
  <div
    class="bg-heroic-uranium dark:bg-heroic-graphite text-heroic-graphite dark:text-heroic-lightgray min-h-screen flex flex-col">
    <div class="w-5/6 min-w-[80px] mx-auto flex-grow flex flex-col">
      <LayoutBasicHeader :hide-nav="false" />
      <main class="flex-grow mb-16">
        <slot />
      </main>
      <LessonSelector />
      <LayoutBasicFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
const hideNav = ref(true)
const toggleLeftNavVisibility = () => {
  hideNav.value = !hideNav.value
}

useLessons().fetchLessonTree()
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
