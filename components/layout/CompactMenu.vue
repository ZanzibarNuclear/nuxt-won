<template>
  <nav>
    <!-- Desktop Menu -->
    <!-- <UHorizontalNavigation :links="links"
      class="hidden md:flex justify-center space-x-8 mt-4 dark:border-gray-800 dark:bg-slate-800" /> -->

    <!-- Mobile Menu Button -->
    <div class="mt-7 ml-4">
      <UButton icon="i-ph-list" color="gray" variant="ghost" @click="isOpen = true" />
    </div>

    <!-- Mobile Menu Modal -->
    <UModal v-model="isOpen">
      <UCard>
        <UVerticalNavigation :links="links" @click="isOpen = false" />
      </UCard>
    </UModal>
  </nav>
</template>

<script setup lang="ts">
const isOpen = ref(false)

const links = [
  {
    label: 'Flux',
    icon: 'i-ph-lightning',
    to: 'https://flux.worldofnuclear.com',
  },
  {
    label: 'What Say You?',
    icon: 'i-ph-chat-centered-dots',
    to: '/wsy',
  },
  {
    label: 'Learning',
    icon: 'i-ph-graduation-cap',
    to: '/learning',
  },
  {
    label: 'Sim Lab',
    icon: 'i-ph-gear-fine',
    to: '/simulators',
  },
  {
    label: 'Perspective',
    icon: 'i-ph-newspaper',
    to: 'https://blog.worldofnuclear.com',
  },
]
</script>

<style scoped></style>