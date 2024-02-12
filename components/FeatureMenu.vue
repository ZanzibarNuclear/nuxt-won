<template>
  <div class="w-48">
    <UVerticalNavigation :links="links"> </UVerticalNavigation>
  </div>
</template>

<script setup>
const links = [
  [
    {
      label: 'What Say You',
    },
    {
      label: 'Nuclear News',
    },
    {
      label: 'Daily Lessons',
    },
    {
      label: 'Simulators',
    },
    {
      label: 'Fun and Games',
    },
  ],
  [
    {
      label: "Zanzi's Nuclear Stack",
    },
  ],
]
</script>

<style lang="scss" scoped></style>
