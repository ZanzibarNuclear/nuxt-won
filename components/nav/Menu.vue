<template>
  <!-- Horizontal Navbar -->
  <nav
    class="dark:bg-heroic-graphite bg-heroic-uranium text-heroic-navy dark:text-nuclear-600 px-4 py-2"
  >
    <!-- Desktop Navigation -->
    <div class="flex justify-between items-center">
      <UButton
        class="md:hidden block pt-2"
        @click="toggleMenu"
        aria-label="Toggle Menu"
        icon="i-ph-list-duotone"
        variant="ghost"
        size="xl"
      />
      <div
        class="hidden md:flex md:items-center mx-auto justify-between space-x-4"
        v-if="!isMobileMenuOpen"
      >
        <NavMenuItem
          v-for="item in menuItems"
          :key="item.label"
          :icon="item.icon"
          :label="item.label"
          :route="item.route"
          :external="item.external"
        />
        <DarkToggle />
      </div>
    </div>

    <!-- Mobile Navigation -->
    <transition name="fade">
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden flex flex-col mt-4 space-y-2 dark:bg-heroic-graphite bg-heroic-uranium p-4 rounded"
      >
        <NavMenuItem
          v-for="item in menuItems"
          :key="item.label"
          :icon="item.icon"
          :label="item.label"
          :route="item.route"
          :external="item.external"
          @picked-item="closeMenu"
        />
        <DarkToggle />
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)

function toggleMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMenu() {
  isMobileMenuOpen.value = false
}

const menuItems = [
  {
    label: 'Lobby',
    icon: 'i-ph-building-office-duotone',
    route: '/lobby',
  },
  {
    label: 'Flux',
    icon: 'i-ph-lightning-duotone',
    route: 'https://flux.worldofnuclear.com',
    external: true,
  },
  {
    label: 'Learning',
    icon: 'i-ph-student-duotone',
    route: '/learning',
  },
  {
    label: 'Adventure',
    icon: 'i-ph-person-simple-hike-duotone',
    route: 'https://hero.worldofnuclear.com',
    external: true,
  },
  // {
  //   label: 'Essays',
  //   icon: 'i-ph-article-ny-times-duotone',
  //   route: 'https://blog.worldofnuclear.com',
  // external: true
  // },
]
</script>
