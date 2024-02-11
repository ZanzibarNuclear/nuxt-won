<template>
  <UCard class="mx-12">
    <template #header>
      <div class="h-8">Declaration of Age</div>
    </template>

    <div class="h-32">
      <p>Today I am {{ age }} years old.</p>
      <div>
        <UButton color="primary" @click="emit('increment')">+</UButton> /
        <UButton color="indigo" variant="outline" @click="emit('decrement')"
          >-</UButton
        >
      </div>
    </div>

    <template #footer>
      <div class="h-8">And that's the truth...phtttthhh</div>
    </template>
  </UCard>
</template>

<script setup>
const props = defineProps({
  age: {
    type: Number,
    required: false,
  },
})
const emit = defineEmits(['increment', 'decrement'])
</script>

<style lang="scss" scoped></style>
