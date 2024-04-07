<template>
  <UCard>
    <div v-for="item in profile" class="mb-4 grid grid-cols-5">
      <span class="label">{{ item.label }}</span>
      <span class="col-span-4">{{ item.value }}</span>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const profile = ref([
  {
    label: 'Email',
    value: 'me@domain.com',
  },
  {
    label: 'Screen Name',
    value: 'Blargy Pants Man',
  },
  {
    label: 'Legal Name',
    value: 'Mr. Blargy Pants, III',
  },
  {
    label: 'About',
    value:
      "I am the man of blargy who wears pants. Some call me Mr. Fancy Pants, but that's not my real name. Frankly, I am insulted.",
  },
  {
    label: 'X',
    value: '@blargypantsman',
  },
  {
    label: 'LinkedIn',
    value: '@blargypantsiii',
  },
  {
    label: 'Discord',
    value: 'blargypants',
  },
])
</script>

<style scoped>
.label {
  font-weight: bold;
  margin-right: 3rem;
}
</style>
