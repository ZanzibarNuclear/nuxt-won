<template>
  <UContainer class="bg-regular-pattern bg-no-repeat bg-contain">
    <header>
      <div class="logo-menu">
        <div class="menu-sandwich">
          <UButton
            size="md"
            variant="ghost"
            icon="i-ph-list-bold"
            title="Navigation"
            @click="toggleLeftNavVisibility"
          />
        </div>
        <div class="logo">
          <NuxtImg src="/images/won-logo-full.svg" />
        </div>
      </div>
      <div class="account">
        <AccountNavatarWidget />
      </div>
    </header>
    <div class="flex gap-x-5">
      <div class="flex-col" :hidden="hideNav">
        <feature-menu />
      </div>
      <main class="flex-col w-5/6 mx-auto px-14 py-4">
        <slot />
      </main>
    </div>
    <footer class="text-center">&copy; 2024 Nuclear Ambitions LLC</footer>
  </UContainer>
</template>

<script setup lang="ts">
const hideNav = ref(true)
const toggleLeftNavVisibility = () => {
  hideNav.value = !hideNav.value
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.0rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.logo-menu {
  display: flex;
  align-items: center;
}
.logo img {
  height: 60px;
}
.menu-sandwich {
  font-size: 24px;
  margin-left: 1.0rem;
  cursor: pointer;
}
.account button {
    padding: 10px 20px;
    background-color: dodgerblue;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.account button:hover {
    background-color: deepskyblue;
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
.title {
  flex: 1;
  text-align: center;
}
.corner {
  margin-left: auto;
}
.sandwich-bump {
  position: relative;
  top: 100px;
}
</style>
